<template>
  <div class="px-2 lg:px-12 py-2 lg:py-6 bg-gray-800 min-h-screen">
    <card class="py-6 px-12 max-w-6xl mx-auto text-indigo-200" v-if="post.id">
      <h1 class="text-3xl lg:text-4xl font-extrabold my-6 tracking-tight">
        {{ post.title }}
      </h1>
      <user-date-thumbnail
        :name="post.user.displayName"
        :date="readableDate"
        :link="`/${post.user.name}`"
        :thumbnailUrl="post.user.thumbnailUrl"
      ></user-date-thumbnail>
      <notebook class="my-6" :nbJson="nbJson"> </notebook>
      <div class="flex flex-row flex-wrap">
        <badge class="mt-0 mb-2 ml-0 mr-2" v-for="tag in post.tags" :key="tag"
          ><nuxt-link
            :to="`/${post.user.name}/posts/?tag=${tag}`"
            class="italic hover:underline"
          >
            {{ tag }}</nuxt-link
          ></badge
        >
      </div>
    </card>
  </div>
</template>

<script>
import Notebook from "@/components/Notebook";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import UserDateThumbnail from "@/components/UserDateThumbnail";
import { getNbJsonFromUrl, getReadableDate } from "~/services/notebook";

export default {
  name: "post",
  head() {
    return {
      title:
        this.post.title + " by " + this.post.user.displayName + " @ REPL Notes",
    };
  },
  async asyncData(context) {
    let returnData = {
      userName: context.params.userName,
      postUrl: context.params.postUrl,
      post: {},
    };

    let querySnapshot = await context.app.$postsCollection
      .where("user.name", "==", returnData.userName)
      .where("url", "==", returnData.postUrl)
      .get();

    if (!querySnapshot.empty) {
      returnData.post = querySnapshot.docs[0].data();
      returnData.nbJson = await getNbJsonFromUrl(returnData.post.file.url);
    }
    return returnData;
  },
  components: {
    notebook: Notebook,
    card: Card,
    badge: Badge,
    "user-date-thumbnail": UserDateThumbnail,
  },
  computed: {
    readableDate() {
      return getReadableDate(this.post.created);
    },
  },
};
</script>

<style>
</style>