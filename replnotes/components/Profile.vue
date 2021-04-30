<template>
    <card class="mx-auto shadow items-center bg-gray-700 text-gray-300">
        <h2 class="mb-3 py-2 text-xl font-bold">Update Your Profile</h2>
        <text-input
            class="mt-3"
            v-model="currentUser.displayName"
            label="Display Name"
        />
        <text-input class="mt-3" v-model="currentUser.title" label="Title" />
        <text-input
            class="mt-3"
            v-model="currentUser.location"
            label="Location"
        />
        <text-area-input
            class="mt-3"
            label="About Me (Plan Text/Markdown) "
            v-model="currentUser.aboutMe"
        />

        <div class="mt-3">
            <label class="block text-sm font-medium"> Photo </label>
            <image-uploader
                :refKey="currentUser.id"
                v-model="photo"
                :imageSrc="currentUser.photoUrl"
                :key="currentUser.photoUrl"
                @url="assignUrl"
                @remove="removePhoto"
            ></image-uploader>
        </div>
        <div v-if="currentUser.social">
            <text-input
                class="mt-3"
                v-model="currentUser.social.github.url"
                :label="currentUser.social.github.label"
            />
            <text-input
                class="mt-3"
                v-model="currentUser.social.linkedIn.url"
                :label="currentUser.social.linkedIn.label"
            />

            <text-input
                class="mt-3"
                v-model="currentUser.social.twitter.url"
                :label="currentUser.social.twitter.label"
            />
            <text-input
                class="mt-3"
                v-model="currentUser.social.youtube.url"
                :label="currentUser.social.youtube.label"
            />
        </div>

        <save-cancel
            class="mt-3"
            :isLoading="isLoading"
            :progress="progress"
            :errors="errors"
            @save="save"
            @cancel="$emit('cancel')"
        />
    </card>
</template>

<script>
import TextInput from '@/components/TextInput'
import TextAreaInput from '@/components/TextAreaInput'
import SaveCancel from '@/components/SaveCancel'
import Card from '@/components/Card'
import { mapState } from 'vuex'
import ImageUploader from '@/components/ImageUploader.vue'

export default {
    name: 'profile',
    components: {
        'text-input': TextInput,
        'text-area-input': TextAreaInput,
        ImageUploader,
        Card,
        SaveCancel,
    },
    data() {
        return {
            photo: null,
            isLoading: false,
            progress: 0,
            errors: [],
        }
    },
    computed: {
        ...mapState(['currentUser', 'token']),
        patch() {
            return {
                displayName: this.currentUser.displayName,
                title: this.currentUser.title ? this.currentUser.title : '',
                location: this.currentUser.location,
                photoUrl: this.currentUser.photoUrl || '',
                thumbnailUrl: this.currentUser.thumbnailUrl || '',
                aboutMe: this.currentUser.aboutMe,
                social: this.currentUser.social,
            }
        },
    },
    methods: {
        removePhoto() {
            this.photo = null
            this.currentUser.photoUrl = ''
            this.currentUser.thumbnailUrl = ''
        },
        assignUrl(url) {
            this.currentUser.photoUrl = url
        },
        async save() {
            try {
                this.isLoading = true
                await this.updateUser()
                this.$router.push(`/${this.currentUser.name}`)
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
                await this.$usersCollection
                    .doc(this.currentUser.id)
                    .update(this.patch)
                this.progress = 50
                let data = new FormData()
                data.append('user', JSON.stringify(this.currentUser))
                data.append('file', this.photo)
                await this.$updateUserPhoto(data, this.token)
                this.progress = 100
            } else {
                await this.$usersCollection
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