<template>
  <div>
    <div class="max-w-2xl lg:max-w-5xl px-8 md:px-12 lg:px-24 mx-auto">
      <h1
        v-if="site && site.title"
        class="
          text-center text-5xl
          sm:text-7xl
          tracking-tight
          font-extrabold
          text-indigo-400
          my-6
        "
      >
        {{ site.title }}
      </h1>
      <h2
        v-if="site && site.description"
        class="
          sm:text-center
          text-xl
          md:text-2xl
          sm:text-3xl
          font-normal
          text-indigo-200
          my-6
        "
      >
        {{ site.description }}
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