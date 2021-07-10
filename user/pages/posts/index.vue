<template>
  <user-posts :user-name="siteOwner.name" :posts="siteOwner.posts"></user-posts>
</template>

<script>
import UserPosts from '@/../components/UserPosts'
import { mapState } from 'vuex'

export default {
  components: {
    UserPosts,
  },
  head() {
    const name = this.siteOwner.displayName
      ? this.siteOwner.displayName
      : this.siteOwner.name

    return this.$createSEOMeta({
      title: name + "'s Posts",
      description: name + "'s Posts @ REPL Notes",
      image: this.siteOwner.photoUrl,
    })
  },

  computed: {
    ...mapState(['siteOwner']),
  },
}
</script>

<style>
</style>