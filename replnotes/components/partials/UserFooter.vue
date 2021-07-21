<template>
  <footer
    class="
      bg-gray-900
      py-6
      px-4
      sm:px-6
      lg:px-8
      text-center text-base text-indigo-200
    "
  >
    <social-links v-if="user.social" :user="user"></social-links>
    <p class="">
      &copy; {{ new Date().getFullYear() }}
      {{ user.displayName ? user.displayName : user.name }}, All Rights
      Reserved.
    </p>
    <p v-if="!user.isPremium" class="border-transparent mt-3">
      <a to="https://replnotes.com" class="cursor-pointer">
        Made with
        <span class="text-indigo-400 hover:text-indigo-500 font-bold"
          >REPL Notes</span
        ></a
      >
    </p>
  </footer>
</template>

<script>
import SocialLinks from './../SocialLinks.vue'

export default {
  components: { SocialLinks },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    site: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style>
</style>