<template>
  <div class="px-2 lg:px-12 py-2 lg:py-6 bg-gray-800 min-h-screen">
    <card v-if="post.id" class="py-6 px-12 max-w-6xl mx-auto text-indigo-200">
      <h1
        v-if="post.title"
        class="text-3xl lg:text-4xl font-extrabold my-6 tracking-tight"
      >
        {{ post.title }}
      </h1>
      <notebook class="my-6" :nb-json="nbJson"> </notebook>
    </card>
  </div>
</template>

<script>
import { getNbJsonFromUrl } from "@/services/notebook";

export default {
  async asyncData(context) {
    const returnData = {
      postUrl: context.params.postUrl,
      post: {
        user: {},
      },
    };

    const snap = await context.app.$postsCollection
      .where("user.name", "==", "blog")
      .where("url", "==", returnData.postUrl)
      .get();

    if (!snap.empty) {
      returnData.post = snap.docs[0].data();
      returnData.nbJson = await getNbJsonFromUrl(returnData.post.file.url);
    } else {
      context.error({ statusCode: 404 });
    }
    return returnData;
  },
  head() {
    const name = this.post.user.displayName
      ? this.post.user.displayName
      : this.post.user.name;
    return this.$createSEOMeta({
      title: this.post.title,
      description: this.post.description
        ? this.post.description
        : this.post.title + " by " + name,
      image: this.post.thumbnail,
    });
  },
};
</script>

<style>
</style>