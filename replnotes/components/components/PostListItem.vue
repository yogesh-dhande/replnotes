<template>
  <div @mouseover="showButtons = true" @mouseleave="showButtons = false">
    <card
      v-if="!editMode"
      class="shadow-lg bg-gray-900 bg-opacity-25 hover:bg-opacity-50"
    >
      <window>
        <template v-if="showButtons && editable" #top-right>
          <icon-button @click="edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </icon-button>
          <confirmed-delete
            :errors="errors"
            @click="deletePost"
            @clear="clearErrors"
          >
            <template #message>
              <div class="mx-4">
                <p class="text-sm text-gray-600">
                  Are you sure you want to delete this post? This action cannot
                  be be undone.
                </p>
              </div>
            </template>
          </confirmed-delete>
        </template>
        <template #body>
          <slot><post-preview :post="post"></post-preview></slot>
        </template>
      </window>
    </card>
    <edit-post v-else :post="post" @cancel="cancelEdit" />
  </div>
</template>

<script>
import Card from '@/components/Card'
import PostPreview from '@/components/PostPreview'
import Window from '@/components/Window'
import ConfirmedDelete from '@/components/ConfirmedDelete'
import IconButton from '@/components/IconButton'
import { mapState } from 'vuex'

export default {
  name: 'PostListItem',
  components: {
    card: Card,
    Window,
    'confirmed-delete': ConfirmedDelete,
    'icon-button': IconButton,
    'post-preview': PostPreview,
    'edit-post': () => import('@/components/EditPost'),
  },
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      errors: [],
      editMode: false,
      showButtons: false,
    }
  },
  computed: {
    ...mapState(['currentUser']),
    editable() {
      return this.currentUser.id === this.post.user.id
    },
  },
  methods: {
    async deletePost() {
      try {
        await this.$postsCollection.doc(this.post.id).delete()
        this.$router.go() // Refresh the page
      } catch (error) {
        console.log(error)
        this.errors.push(error.message)
      }
    },
    clearErrors() {
      this.errors = []
    },
    edit() {
      this.editMode = true
    },
    cancelEdit() {
      this.editMode = false
    },
  },
}
</script>

<style>
</style>