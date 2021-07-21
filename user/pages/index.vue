<template>
  <div>
    <user-home
      v-if="siteOwner && siteOwner.name"
      :user="siteOwner"
      :site="site"
      :posts="posts"
    ></user-home>
    <div v-else class="text-4xl text-indigo-200 font-bold p-12 text-center">
      Site Not Found
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import UserHome from '@/components/partials/UserHome'

export default {
  components: {
    UserHome,
  },

  head() {
    if (this.siteOwner.name) {
      const name = this.siteOwner.displayName
        ? this.siteOwner.displayName
        : this.siteOwner.name
      return this.$createSEOMeta({
        title:
          this.site && this.site.title ? this.site.title : name + "'s Posts", // replace with site title
        description:
          this.site && this.site.description
            ? this.site.description
            : name + "'s Posts", // replace with site description
        image: this.siteOwner.photoUrl,
      })
    }
  },
  computed: {
    ...mapState(['siteOwner', 'site', 'posts']),
  },
}
</script>

<style>
</style>