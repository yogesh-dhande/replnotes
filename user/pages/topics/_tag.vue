<template>
  <div>
    <h1 class="text-center text-4xl font-bold text-indigo-200 p-6">
      {{ tag }}
    </h1>
    <user-posts
      :user-name="siteOwner.name"
      :query-tags="[tag]"
      :posts="posts"
    ></user-posts>
  </div>
</template>

<script>
import UserPosts from '@/components/UserPosts'
import { mapState } from 'vuex'

export default {
  components: {
    UserPosts,
  },
  asyncData(context) {
    const returnData = {
      tag: context.params.tag,
    }
    return returnData
  },
  head() {
    const name = this.siteOwner.displayName
      ? this.siteOwner.displayName
      : this.siteOwner.name

    return this.$createSEOMeta({
      title: this.tag,
      description: name + "'s Posts on " + this.tag,
      image: this.siteOwner.photoUrl,
    })
  },
  computed: {
    ...mapState(['siteOwner', 'posts']),
  },
}
</script>

<style>
</style>