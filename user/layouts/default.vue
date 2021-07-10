<template>
  <div class="bg-gray-800">
    <div class="min-h-screen">
      <UserNavBar
        :user="siteOwner"
        class="sticky top-0 z-50"
        :class="{
          'shadow-2xl bg-gray-800 border-b-2 border-gray-900 border-opacity-75':
            !view.atTopOfPage,
        }"
      />
      <Nuxt />
    </div>

    <UserFooter :user="siteOwner" />
  </div>
</template>

<script>
import UserNavBar from '@/components/partials/UserNavBar'
import UserFooter from '@/components/partials/UserFooter'
import { mapState } from 'vuex'

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
    ...mapState(['siteOwner']),
  },
  // a beforeMount call to add a listener to the window
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
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
