<template>
  <div class="my-12 text-indigo-200">
    <card :key="post.id" class="max-w-lg mx-auto bg-gray-900 py-4 shadow">
      <h2 class="mb-3 py-2 text-xl text-center font-bold">New Post</h2>
      <file-input
        v-model="file"
        class="mt-3"
        :ref-key="post.id"
        @input="
          fileErrors = []
          errors = []
        "
        @change="validateFile"
      ></file-input>
      <input-errors :errors="fileErrors"></input-errors>
      <div v-if="file && fileErrors.length == 0">
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
          @focus="
            titleErrors = []
            errors = []
          "
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
      </div>
      <save-cancel
        class="mt-3"
        :is-loading="isLoading"
        :progress="progress"
        :errors="errors"
        :disabled="disabled"
        @save="createPost"
        @cancel="$emit('cancel')"
      />
    </card>
    <div v-if="file" class="text-indigo-500">
      <h2 class="mt-6 text-center text-2xl sm:text-4xl font-bold">
        Thumbnail Preview
      </h2>
      <card class="mt-3 max-w-lg mx-auto bg-gray-900 shadow">
        <post-preview :post="post"></post-preview>
      </card>
      <h2 class="mt-12 text-center text-2xl sm:text-4xl font-bold">
        Post Preview
      </h2>
      <post :post="post" :nb-json="nbJson" />
      <save-cancel
        class="mt-3 max-w-lg mx-auto"
        :is-loading="isLoading"
        :progress="progress"
        :errors="errors"
        :disabled="disabled"
        @save="createPost"
        @cancel="$emit('cancel')"
      />
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
  parseNbJson,
} from '@/services/notebook'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'CreatePost',
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
  data() {
    return {
      postRef: this.$postsCollection.doc(),
      url: '',
      urlErrors: [],
      title: '',
      titleErrors: [],
      description: '',
      tags: [],
      file: null,
      fileErrors: [],
      content: null,
      thumbnails: [],
      isLoading: false,
      progress: 0,
      thumbnailSrc: null,
      errors: [],
    }
  },
  computed: {
    ...mapGetters(['userPostUrls', 'userTags']),
    ...mapState(['currentUser', 'isEmailVerified', 'token']),
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
      if (this.file) {
        return this.file.name.substr(
          this.file.name.lastIndexOf('.') + 1,
          this.file.length
        )
      }
      return null
    },
    filename() {
      if (this.file) {
        return this.file.name.substr(0, this.file.name.lastIndexOf('.'))
      }
      return null
    },
    post() {
      return {
        id: this.postRef ? this.postRef.id : null,
        created: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        url: this.url,
        title: this.title,
        description: this.description,
        tags: this.tags,
        user: this.currentUser
          ? {
              id: this.currentUser.id,
              name: this.currentUser.name,
              displayName: this.currentUser.displayName || '',
              thumbnailUrl: this.currentUser.thumbnailUrl || '',
            }
          : null,
        file: {
          type: this.fileType,
          lastModifiedDate: this.file ? this.file.lastModifiedDate : '',
        },
        thumbnail: this.thumbnailSrc,
      }
    },
    nbJson() {
      return parseNbJson(this.content)
    },
  },
  watch: {
    async file(newValue) {
      this.content = null
      this.thumbnails = []
      this.thumbnailSrc = null
      await this.handleFileChange(newValue)
    },
    url() {
      this.validateUrl()
    },
    title() {
      this.validateTitle()
    },
  },
  methods: {
    resetData() {
      this.content = null
      this.url = ''
      this.title = ''
      this.description = ''
      this.tags = []
      this.thumbnails = []
      this.thumbnailSrc = null
    },
    async handleFileChange(newValue) {
      if (newValue) {
        if (this.fileErrors.length === 0) {
          this.resetData()
          const text = await readFile(this.file)
          try {
            this.content = JSON.parse(text)
            this.content.cells.forEach((cell) => {
              cell.source.forEach(this.parseMagicTags)
            })
            if (!this.url) {
              this.url = this.filename.replace(' ', '_')
            }
            if (!this.description & (this.content.cells.length > 0)) {
              this.description = this.content.cells[0].source.join()
            }

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
      if (!this.title || this.title.length === 0) {
        this.titleErrors.push('Please enter a title for the post.')
      }
    },
    validateUrl() {
      this.urlErrors = []
      if (!this.url || this.url.length === 0) {
        this.urlErrors.push('Please enter a url for the post.')
      } else if (!/^[0-9a-zA-Z_.-]+$/.test(this.url)) {
        this.urlErrors.push('No spaces allowed in the url.')
      } else if (this.userPostUrls.includes(this.url)) {
        this.urlErrors.push(
          `A post at ${this.baseUrl}${this.url} already exists.` // TODO add a link to edit the existing post
        )
      }
      return this.urlErrors
    },
    isFormValid() {
      this.validateFile()
      this.validateUrl()
      return !this.disabled
    },
    async createPost() {
      this.clearErrors()
      if (this.isFormValid()) {
        try {
          this.isLoading = true
          this.thumbnailSrc = await this.$uploadPostThumbnail(
            this.currentUser,
            this.post
          )
          this.progress = 33
          await this.postRef.set(this.post)
          this.progress = 66
          await this.upload()
          this.progress = 100
          this.$router.push('/dashboard')
        } catch (error) {
          // this.postRef.delete();
          console.log(error.message)
          if (error.message && error.message.error.message) {
            this.errors.push(error.message.error.message)
          }
          if (error.response && error.response.data.message) {
            this.errors.push(error.response.data.message)
          }
        } finally {
          this.isLoading = false
        }
      }
    },
    async upload() {
      const data = new FormData()
      data.append('file', this.file)
      data.append('post', JSON.stringify(this.post))
      await this.$uploadPostFile(data, this.token)
      this.postRef = this.$postsCollection.doc()
      this.file = null
    },
  },
}
</script>

<style scoped>
</style>