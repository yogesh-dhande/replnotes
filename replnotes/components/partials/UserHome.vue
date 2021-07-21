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
        {{ site && site.title ? site.title : user.displayName }}
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
        {{ site && site.description ? site.description : '' }}
      </h2>
    </div>

    <user-posts :user-name="user.name" :site="site" :posts="posts"></user-posts>
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
    site: {
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