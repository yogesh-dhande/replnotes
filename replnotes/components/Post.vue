<template>
  <card v-if="post.id" class="py-6 px-12 max-w-6xl mx-auto text-indigo-200">
    <div v-if="post.title">
      <h1 class="text-3xl lg:text-4xl font-extrabold my-6 tracking-tight">
        {{ post.title }}
      </h1>
      <user-date-thumbnail
        :name="post.user.displayName"
        :date="readableDate"
        :link="`/about`"
        :thumbnail-url="post.user.thumbnailUrl"
      ></user-date-thumbnail>
    </div>

    <notebook class="my-6" :nb-json="nbJson"> </notebook>
    <div class="flex flex-row flex-wrap">
      <badge v-for="tag in post.tags" :key="tag" class="mt-0 mb-2 ml-0 mr-2"
        ><nuxt-link :to="topicLink(tag)" class="hover:underline">
          {{ tag }}</nuxt-link
        ></badge
      >
    </div>
  </card>
</template>

<script>
import { getReadableDate } from "@/services/notebook";
import { mapState } from "vuex";

export default {
  props: {
    post: {
      type: Object,
      default: () => {},
    },
    nbJson: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState(["siteOwner"]),
    readableDate() {
      return getReadableDate(this.post.created);
    },
    topicLink() {
      return (tag) => {
        return this.siteOwner ? `/topics/${tag}` : "#";
      };
    },
  },
};
</script>

<style>
</style>