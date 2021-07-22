<template>
  <div class="px-2 lg:px-12 py-2 lg:py-6 bg-gray-800 min-h-screen">
    <post :post="post" :nb-json="nbJson" />
  </div>
</template>

<script>
import { getNbJsonFromUrl } from '@/services/notebook'

export default {
  async asyncData(context) {
    const returnData = {
      userName: context.store.state.siteOwner.name,
      postUrl: context.params.postUrl,
      post: {
        user: {},
      },
    }

    const post = context.store.getters.post(returnData.postUrl)
    if (post.id) {
      returnData.post = post
      returnData.nbJson = await getNbJsonFromUrl(returnData.post.file.url)
    } else {
      context.error({ statusCode: 404 })
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