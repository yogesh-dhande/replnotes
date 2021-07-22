<template>
  <user-posts :user-name="siteOwner.name" :posts="posts"></user-posts>
</template>

<script>
import UserPosts from '@/components/UserPosts'
import { mapState } from 'vuex'

export default {
  components: {
    UserPosts,
  },
  computed: {
    ...mapState(['siteOwner', 'posts']),
  },
}
</script>

<style>
</style>