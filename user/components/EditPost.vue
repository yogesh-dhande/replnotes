<template>
  <div>
    <card
      :key="localPost.id"
      class="mx-auto shadow bg-gray-900 text-indigo-200"
    >
      <file-input
        v-model="file"
        class="mt-3"
        :ref-key="localPost.id"
        @input="
          fileErrors = []
          errors = []
        "
        @change="validateFile"
      ></file-input>
      <input-errors :errors="fileErrors"></input-errors>

      <url-slug-input
        v-model="url"
        class="mt-3"
        label="Post URL"
        :prefix="baseUrl"
        @focus="
          urlErrors = []
          errors = []
        "
        @blur="validateUrl"
      ></url-slug-input>
      <input-errors :errors="urlErrors"></input-errors>
      <text-input
        v-model="title"
        class="mt-3"
        label="Title"
        @focus="titleErrors = []"
      ></text-input>
      <input-errors :errors="titleErrors"></input-errors>

      <text-area-input
        v-model="description"
        class="mt-3"
        label="Description"
      ></text-area-input>
      <image-picker
        v-if="thumbnails.length > 0"
        v-model="thumbnailSrc"
        class="mt-3"
        :thumbnails="thumbnails"
      >
      </image-picker>
      <multi-choice
        v-model="tags"
        class="mt-3"
        label="Tags"
        :options="userTags"
        allow-insertion-of-new-keys
      ></multi-choice>
      <save-cancel
        class="mt-3"
        :is-loading="isLoading"
        :progress="progress"
        :errors="errors"
        :disabled="disabled"
        @save="savePost"
        @cancel="$emit('cancel')"
      />
    </card>
    <div v-if="file">
      <h2 class="mt-6 text-center text-2xl font-bold">Thumbnail Preview</h2>
      <card class="mt-3 bg-gray-700 bg-opacity-25 hover:bg-opacity-50 shadow">
        <post-preview :post="localPost"></post-preview>
      </card>
    </div>
  </div>
</template>

<script>
import ImagePicker from '@/components/ImagePicker'
import SaveCancel from '@/components/SaveCancel'
import FileInput from '@/components/FileInput'
import URLSlugInput from '@/components/URLSlugInput'
import TextInput from '@/components/TextInput'
import TextAreaInput from '@/components/TextAreaInput'
import Card from '@/components/Card'
import MultiChoice from '@/components/MultiChoice'
import PostPreview from '@/components/PostPreview'
import InputErrors from '@/components/InputErrors'

import {
  readFile,
  parseThumbnailsFromNbJson,
  downloadFileFromUrl,
} from '@/services/notebook'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'EditPost',
  components: {
    'image-picker': ImagePicker,
    'file-input': FileInput,
    'url-slug-input': URLSlugInput,
    'text-input': TextInput,
    'text-area-input': TextAreaInput,
    'post-preview': PostPreview,
    'multi-choice': MultiChoice,
    'save-cancel': SaveCancel,
    'input-errors': InputErrors,
    card: Card,
  },
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      url: this.post.url,
      title: this.post.title,
      description: this.post.description,
      tags: this.post.tags,
      file: this.post.file,
      thumbnailSrc: this.post.thumbnail,
      fileToUpload: null,
      urlErrors: [],
      fileErrors: [],
      titleErrors: [],
      content: null,
      thumbnails: [],
      isLoading: false,
      progress: 0,
      errors: [],
    }
  },
  computed: {
    ...mapGetters(['userPostUrls', 'userTags']),
    ...mapState(['currentUser', 'token']),
    allErrors() {
      return [].concat(
        this.errors,
        this.urlErrors,
        this.fileErrors,
        this.titleErrors
      )
    },
    disabled() {
      if (this.allErrors.length > 0) {
        return true
      }
      return false
    },
    baseUrl() {
      return `${process.env.NUXT_ENV_DISPLAY_URL}/${this.currentUser.name}/posts/`
    },
    fileType() {
      if (this.file && this.file.name) {
        return this.file.name.substr(
          this.file.name.lastIndexOf('.') + 1,
          this.file.length
        )
      }
      return 'ipynb' // assume that an existing post has the correct file type
    },
    fileModifiedDate() {
      if (this.file && this.file.lastModifiedDate) {
        return this.file.lastModifiedDate
      }
      return this.post.file.lastModifiedDate
    },
    localPost() {
      return {
        id: this.post.id,
        url: this.url,
        title: this.title,
        description: this.description,
        tags: this.tags,
        user: this.post.user,
        'file.type': this.fileType,
        'file.lastModifiedDate': this.fileModifiedDate,
        thumbnail: this.thumbnailSrc,
      }
    },
  },
  watch: {
    async file(newValue) {
      // Only add
      if (newValue instanceof File) {
        this.content = null
        this.thumbnails = []
        this.thumbnailSrc = null
        this.fileToUpload = this.file
        await this.handleFileChange(newValue)
        this.content.cells.forEach((cell) => {
          cell.source.forEach(this.parseMagicTags)
        })
        if (!this.description & (this.content.cells.length > 0)) {
          this.description = this.content.cells[0].source.join()
        }
      } else {
        await this.handleFileChange(newValue)
      }
    },
    url() {
      this.validateUrl()
    },
    title() {
      this.validateTitle()
    },
  },
  async mounted() {
    if (this.file.url) {
      this.file = await downloadFileFromUrl(this.file.url)
    }
  },
  methods: {
    async handleFileChange(newValue) {
      if (newValue) {
        if (this.fileErrors.length === 0) {
          try {
            const text = await readFile(this.file)
            this.content = JSON.parse(text)

            this.thumbnails = parseThumbnailsFromNbJson(this.content)
          } catch (error) {
            this.fileErrors.push(error.message)
            this.fileErrors.push('Only Jupyter Notebooks are supported.')
          }
        }
      }
    },
    parseMagicTags(line) {
      const commands = line.split(':')
      const key = commands[0].trim().replace(' ', '').toLowerCase()
      const value = commands.length > 1 ? commands[1].trim() : ''
      if (key.includes('#title')) {
        this.title = value
      } else if (key.includes('#url')) {
        this.url = value
      } else if (key.includes('#description')) {
        this.description = value
      } else if (key.includes('#tags')) {
        this.tags = value.split(',').map((tag) => tag.trim())
      }
    },
    clearErrors() {
      this.errors = []
    },
    validateFile() {
      this.fileErrors = []
      if (!this.file) {
        this.fileErrors.push(
          'Please upload a Jupyter Notebook to create a post.'
        )
      } else if (this.fileType !== 'ipynb') {
        this.fileErrors.push('Only Jupyter Notebooks are supported')
      } else if (this.file.size > 10 * 1024 * 1024) {
        this.fileErrors.push('Files larger than 10 MB are not supported.')
      }
    },
    validateTitle() {
      this.titleErrors = []
      if (!this.localPost.title || this.localPost.title.length === 0) {
        this.titleErrors.push('Please enter a title for the post.')
      }
    },
    validateUrl() {
      this.urlErrors = []
      if (!this.localPost.url || this.localPost.url.length === 0) {
        this.urlErrors.push('Please enter a url for the post.')
      } else if (!/^[0-9a-zA-Z_.-]+$/.test(this.localPost.url)) {
        this.urlErrors.push('No spaces allowed in the url.')
      }
      return this.urlErrors
    },
    isFormValid() {
      this.validateUrl()
      return !this.disabled
    },

    async savePost() {
      this.clearErrors()
      if (this.isFormValid()) {
        try {
          this.isLoading = true
          this.progress = 25
          if (this.thumbnailSrc !== this.post.thumbnail) {
            this.thumbnailSrc = await this.$uploadPostThumbnail(
              this.currentUser,
              this.localPost
            )
            this.progress = 50
          }
          await this.updatePost()
          this.$router.go() // Refresh the page
        } catch (error) {
          if (error.message) {
            this.errors.push(error.message)
          }
          if (error.response.data.message) {
            this.errors.push(error.response.data.message)
          }
        } finally {
          this.isLoading = false
        }
      }
    },
    async updatePost() {
      if (this.fileToUpload) {
        const data = new FormData()
        data.append('post', JSON.stringify(this.localPost))
        data.append('file', this.fileToUpload)
        await this.$uploadPostFile(data, this.token)
        this.fileToUpload = null
        this.progress = 75
      }
      this.$postsCollection.doc(this.post.id).update(this.localPost)
      this.progress = 100
      this.$emit('cancel')
    },
  },
}
</script>

<style>
</style>