<template>
  <footer class="bg-gray-900">
    <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav
        class="-mx-5 -my-2 flex flex-wrap justify-center"
        aria-label="Footer"
      >
        <nuxt-link
          to="/guides"
          class="
            text-indigo-100
            hover:text-indigo-300
            px-3
            py-2
            text-lg
            font-bold
            border-transparent
          "
          @click.native="scrollToTop"
          >Guides</nuxt-link
        >
        <nuxt-link
          to="/contact"
          class="
            text-indigo-100
            hover:text-indigo-300
            px-3
            py-2
            text-lg
            font-bold
            border-transparent
          "
          @click.native="scrollToTop"
          >Contact</nuxt-link
        >
        <nuxt-link
          to="/dashboard"
          class="
            text-indigo-100
            hover:text-indigo-300
            px-3
            py-2
            text-lg
            font-bold
            border-transparent
          "
          @click.native="scrollToTop"
          >Dashboard</nuxt-link
        >

        <nuxt-link
          to="/demo"
          class="
            text-indigo-100
            hover:text-indigo-300
            px-3
            py-2
            text-lg
            font-bold
            border-transparent
          "
          @click.native="scrollToTop"
          >Demo</nuxt-link
        >
        <nuxt-link
          v-if="!currentUser.id"
          to="/login"
          class="
            text-indigo-100
            hover:text-indigo-300
            px-3
            py-2
            text-lg
            font-bold
            border-transparent
          "
          @click.native="scrollToTop"
          >Sign In</nuxt-link
        >
        <nuxt-link
          v-if="!currentUser.id"
          to="/register"
          class="
            text-indigo-100
            hover:text-indigo-300
            px-3
            py-2
            text-lg
            font-bold
            border-transparent
          "
          @click.native="scrollToTop"
          >Sign Up</nuxt-link
        >
        <!-- <nuxt-link
                    to="#"
                    class="text-indigo-100 hover:text-indigo-300 px-3 py-2 text-lg font-bold border-transparent"
                    >FAQs</nuxt-link
                > -->
      </nav>

      <p class="mt-8 text-center text-base text-gray-400">
        &copy; {{ new Date().getFullYear() }} REPL Notes, All Rights Reserved.
      </p>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['currentUser']),
  },
  methods: {
    scrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style>
</style>