<template>
  <div v-if="posts" class="px-2 lg:px-12 py-2 bg-gray-800 min-h-screen">
    <div v-if="currentUser.name == userName" class="mt-6">
      <div v-if="!editMode" class="text-center">
        <button
          class="
            p-2
            w-10
            h-10
            text-gray-300
            bg-indigo-600
            rounded-full
            hover:bg-indigo-700
            shadow
            hover:shadow-xl
            mouse
            transition
            ease-in
            duration-200
            focus:outline-none
          "
          @click="editMode = true"
        >
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>

      <create-post
        v-else
        class="max-w-xl"
        @cancel="editMode = false"
      ></create-post>
    </div>

    <div>
      <!-- Published page -->
      <post-list :key="userName" :posts="orderedPosts"> </post-list>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import CreatePost from '@/components/CreatePost'
import { mapState, mapGetters } from 'vuex'

function findCommonElements(arr1, arr2) {
  return arr1.some((item) => arr2.includes(item))
}

export default {
  name: 'UserPosts',
  components: {
    PostList,
    CreatePost,
  },
  props: {
    userName: {
      type: String,
      default: null,
    },
    queryTags: {
      type: Array,
      default: () => [],
    },
    posts: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      listeners: [],
      editMode: false,
    }
  },
  computed: {
    ...mapState(['currentUser']),
    ...mapGetters(['userTags']),
    filteredPosts() {
      if (this.tags.length > 0) {
        return this.posts.filter((post) => {
          return findCommonElements(this.tags, post.tags)
        })
      }
      return this.posts
    },
    orderedPosts() {
      // most recent first
      const o = this.filteredPosts
        .slice()
        .sort((a, b) => b.created.seconds - a.created.seconds)
      return o
    },
    tags() {
      return Array.isArray(this.queryTags) ? this.queryTags : [this.queryTags]
    },
  },
  watch: {
    queryTags(newValue) {
      this.tags = Array.isArray(newValue) ? newValue : [newValue]
    },
  },
}
</script>

<style>
</style>