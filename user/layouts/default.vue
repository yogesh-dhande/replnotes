<template>
  <div class="bg-gray-800 flex flex-col min-h-screen">
    <div id="nuxt-view" class="flex-grow">
      <UserNavBar
        :user="siteOwner"
        :site="site"
        class="sticky top-0 z-50"
        :class="{
          'shadow-2xl bg-gray-800 border-b-2 border-gray-900 border-opacity-75':
            !view.atTopOfPage,
        }"
      />
      <Nuxt />
    </div>
    <div v-if="!isPaidAccount" class="border-transparent mt-3">
      <div
        class="
          max-w-4xl
          mx-auto
          py-12
          px-4
          sm:px-6
          lg:py-16
          lg:px-8
          lg:flex
          lg:items-center
          lg:justify-between
        "
      >
        <h2 class="text-2xl text-indigo-100 sm:text-3xl">
          <span class="block font-bold tracking-tight">
            <a
              href="https://replnotes.com"
              class="cursor-pointer"
              target="_blank"
            >
              Made with
              <span class="text-indigo-400 hover:text-indigo-500 font-bold"
                >REPL Notes</span
              ></a
            ></span
          >
          <span class="block text-indigo-200 italic text-lg sm:text-xl"
            >Build your own website in minutes with Jupyter notebooks.</span
          >
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <a
              href="https://replnotes.com"
              class="
                inline-flex
                items-center
                justify-center
                px-5
                py-3
                border border-transparent
                text-base
                font-medium
                rounded-md
                text-white
                bg-indigo-600
                hover:bg-indigo-700
              "
            >
              Start blogging for free
            </a>
          </div>
        </div>
      </div>
    </div>
    <UserFooter :user="siteOwner" :site="site" />
  </div>
</template>

<script>
import UserNavBar from '@/components/partials/UserNavBar'
import UserFooter from '@/components/partials/UserFooter'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    UserNavBar,
    UserFooter,
  },
  data() {
    return {
      view: {
        atTopOfPage: true,
      },
    }
  },
  computed: {
    ...mapState(['siteOwner', 'site', 'domain']),
    ...mapGetters(['isCustomDomain', 'isPaidAccount']),
  },
  // a beforeMount call to add a listener to the window
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted() {
    if (this.site.embedTags) {
      this.$postscribe('#nuxt-view', this.site.embedTags)
    }
    if (!this.isCustomDomain) {
      // Only add event on subdomains
      this.$splitbee.track(this.domain)
    }
  },

  methods: {
    // the function to call when the user scrolls, added as a method
    handleScroll() {
      // when the user scrolls, check the pageYOffset
      if (window.pageYOffset > 0) {
        // user is scrolled
        if (this.view.atTopOfPage) this.view.atTopOfPage = false
      } else if (!this.view.atTopOfPage) {
        // user is at top of page
        this.view.atTopOfPage = true
      }
    },
  },
}
</script>

<style>
</style>
