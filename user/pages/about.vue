<template>
  <about :user="siteOwner" />
</template>

<script>
import { mapState } from 'vuex'
import About from '@/components/About.vue'

export default {
  components: { About },
  head() {
    if (this.siteOwner.name) {
      const name = this.siteOwner.displayName
        ? this.siteOwner.displayName
        : this.siteOwner.name
      return this.$createSEOMeta({
        title: name,
        description: this.siteOwner.aboueMe,
        image: this.siteOwner.photoUrl,
      })
    }
  },
  computed: {
    ...mapState(['siteOwner']),
  },
}
</script>

<style>
</style>