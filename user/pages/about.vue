<template>
  <about :user="siteOwner" />
</template>

<script>
import { mapState } from 'vuex'
import About from '@/../components/About.vue'

export default {
  components: { About },
  computed: {
    ...mapState(['siteOwner']),
  },
}
</script>

<style>
</style>