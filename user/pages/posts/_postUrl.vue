<template>
  <div class="px-2 lg:px-12 py-2 lg:py-6 bg-gray-800 min-h-screen">
    <post :post="post" :nb-json="nbJson" />
  </div>
</template>

<script>
import { getNbJsonFromUrl } from '@/services/notebook'

export default {
  name: 'Post',
  async asyncData(context) {
    const returnData = {
      userName: context.store.state.siteOwner.name,
      postUrl: context.params.postUrl,
      post: {
        user: {},
      },
    }

    const posts = context.store.state.siteOwner.posts.filter(
      (post) => post.url === returnData.postUrl
    )
    if (posts.length > 0) {
      returnData.post = posts[0]
      returnData.nbJson = await getNbJsonFromUrl(returnData.post.file.url)
    }
    return returnData
  },
  head() {
    return this.$createSEOMeta({
      title: this.post.title,
      description: this.post.description
        ? this.post.description
        : this.post.title + ' by ' + this.post.user.displayName,
      image: this.post.thumbnail,
    })
  },
}
</script>

<style>
</style>