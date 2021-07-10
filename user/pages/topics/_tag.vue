<template>
  <div>
    <h1 class="text-center text-4xl font-bold text-indigo-200 p-6">
      {{ tag }}
    </h1>
    <user-posts
      :user-name="userName"
      :query-tags="[tag]"
      :posts="posts"
    ></user-posts>
  </div>
</template>

<script>
import UserPosts from '@/../components/UserPosts'
import { mapState } from 'vuex'

export default {
  components: {
    UserPosts,
  },
  asyncData(context) {
    const returnData = {
      userName: context.store.state.siteOwner.name,
      tag: context.params.tag,
      posts: context.store.state.siteOwner.posts,
    }
    return returnData
  },
  head() {
    const name = this.siteOwner.displayName
      ? this.siteOwner.displayName
      : this.siteOwner.name

    return this.$createSEOMeta({
      title: name + "'s Posts",
      description: name + "'s Posts",
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