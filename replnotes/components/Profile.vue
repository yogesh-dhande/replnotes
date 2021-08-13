<template>
  <div class="mx-6 text-indigo-200">
    <card class="max-w-2xl mx-auto bg-gray-900 p-4 shadow">
      <h2 class="mb-3 py-2 text-xl font-bold">Update Your Profile</h2>
      <text-input v-model="displayName" class="mt-3" label="Display Name" />
      <text-input v-model="title" class="mt-3" label="Title" />
      <text-input v-model="location" class="mt-3" label="Location" />
      <text-area-input
        v-model="aboutMe"
        class="mt-3"
        label="About Me (Plan Text/Markdown) "
      />

      <div class="mt-3">
        <label class="block text-sm font-medium"> Photo </label>
        <image-uploader
          :key="photoUrl"
          v-model="photo"
          :ref-key="currentUser.id"
          :image-src="photoUrl"
          @url="assignUrl"
          @remove="removePhoto"
        ></image-uploader>
      </div>
      <div v-if="social">
        <text-input
          v-model="social.github.url"
          class="mt-3"
          :label="social.github.label"
        />
        <text-input
          v-model="social.linkedIn.url"
          class="mt-3"
          :label="social.linkedIn.label"
        />

        <text-input
          v-model="social.twitter.url"
          class="mt-3"
          :label="social.twitter.label"
        />
        <text-input
          v-model="social.youtube.url"
          class="mt-3"
          :label="social.youtube.label"
        />
      </div>

      <save-cancel
        class="mt-3"
        :is-loading="isLoading"
        :progress="progress"
        :errors="errors"
        @save="save"
        @cancel="$emit('cancel')"
      />
    </card>
  </div>
</template>

<script>
import TextInput from '@/components/TextInput'
import TextAreaInput from '@/components/TextAreaInput'
import SaveCancel from '@/components/SaveCancel'
import Card from '@/components/Card'
import { mapState } from 'vuex'
import ImageUploader from '@/components/ImageUploader.vue'

export default {
  name: 'Profile',
  components: {
    'text-input': TextInput,
    'text-area-input': TextAreaInput,
    ImageUploader,
    Card,
    SaveCancel,
  },
  props: {
    currentUser: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      photo: null,
      isLoading: false,
      progress: 0,
      errors: [],
      displayName: this.currentUser.displayName,
      title: this.currentUser.title ? this.currentUser.title : '',
      location: this.currentUser.location,
      photoUrl: this.currentUser.photoUrl || '',
      thumbnailUrl: this.currentUser.thumbnailUrl || '',
      aboutMe: this.currentUser.aboutMe,
      social: this.currentUser.social,
    }
  },
  computed: {
    ...mapState(['token']),
    patch() {
      return {
        displayName: this.displayName,
        title: this.title,
        location: this.location,
        photoUrl: this.photoUrl,
        thumbnailUrl: this.thumbnailUrl,
        aboutMe: this.aboutMe,
        social: this.social,
      }
    },
  },
  methods: {
    removePhoto() {
      this.photo = null
      this.photoUrl = ''
      this.thumbnailUrl = ''
    },
    assignUrl(url) {
      this.photoUrl = url
    },
    async save() {
      try {
        this.isLoading = true
        await this.updateUser()
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
    },
    async updateUser() {
      if (this.photo) {
        // Needed to force the photo to update immediately on the client.
        this.progress = 25
        await this.$usersCollection.doc(this.currentUser.id).update(this.patch)
        this.progress = 50
        const data = new FormData()
        data.append('user', JSON.stringify(this.currentUser))
        data.append('file', this.photo)
        await this.$updateUserPhoto(data, this.token)
        this.progress = 100
      } else {
        await this.$fire.firestore
          .collection('users')
          .doc(this.currentUser.id)
          .update(this.patch)
      }
      this.$emit('save')
    },
  },
}
</script>

<style>
</style>