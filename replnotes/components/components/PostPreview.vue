<template>
  <div>
    <nuxt-link
      v-if="post"
      v-slot="{ navigate }"
      :to="postLink"
      alt="Post Link"
      custom
    >
      <div
        class="sm:px-0 flex flex-col cursor-pointer"
        role="link"
        @click="navigate"
        @keypress.enter="navigate"
      >
        <div class="flex-1 p-6 flex flex-col justify-between">
          <div class="flex-1 block mt-2">
            <p class="text-xl my-2 font-bold tracking-tight text-indigo-200">
              {{ post.title }}
            </p>
            <p class="my-1 text-base text-indigo-100">
              {{ post.description }}
            </p>
          </div>
          <img
            v-if="imageSrc"
            class="my-2 mx-auto max-h-48 bg-white opacity-80 rounded-md"
            :src="imageSrc"
            alt="Thumbnail"
          />
          <user-date-thumbnail
            :name="post.user.displayName"
            :date="readableDate"
            :link="`/${post.user.name}`"
            :thumbnail-url="post.user.thumbnailUrl"
          ></user-date-thumbnail>
          <div class="flex flex-row flex-wrap space-x-2 mt-6">
            <badge v-for="tag in post.tags" :key="tag" class="mt-0 mb-2 mx-0"
              ><nuxt-link :to="topicLink(tag)" class="hover:underline">
                {{ tag }}</nuxt-link
              ></badge
            >
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import Badge from "@/components/Badge.vue";
import UserDateThumbnail from "@/components/UserDateThumbnail";
import { getReadableDate } from "@/services/notebook";
import { mapState } from "vuex";

export default {
  name: "PostPreview",
  components: { Badge, "user-date-thumbnail": UserDateThumbnail },
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState(["siteOwner"]),
    imageSrc() {
      return this.post.thumbnail;
    },
    postLink() {
      if (this.readableDate) {
        // post has not been created yet
        if (this.post.user) {
          return `/posts/${this.post.url}`;
        }
        return "exampleLink";
      }
      return "#";
    },
    topicLink() {
      return (tag) => {
        return `/topics/${tag}`;
      };
    },
    readableDate() {
      return getReadableDate(this.post.created);
    },
  },
};
</script>

<style>
</style>