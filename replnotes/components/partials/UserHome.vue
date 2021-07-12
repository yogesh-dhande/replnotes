<template>
  <div>
    <div>
      <h1
        class="
          text-center text-5xl
          sm:text-7xl
          tracking-tight
          font-extrabold
          text-indigo-400
          my-6
        "
      >
        {{ user.site && user.site.title ? user.site.title : user.displayName }}
      </h1>
      <h2
        class="
          text-center text-2xl
          sm:text-4xl
          font-medium
          text-indigo-200
          my-6
        "
      >
        {{ user.site && user.site.description ? user.site.description : '' }}
      </h2>
    </div>

    <user-posts :user-name="user.name" :posts="posts"></user-posts>
  </div>
</template>

<script>
import UserPosts from './../UserPosts.vue'

export default {
  components: { UserPosts },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    posts: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style>
</style>