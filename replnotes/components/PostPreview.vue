<template>
  <div class="flex flex-col">
    <nuxt-link
      v-if="post"
      :to="postLink"
      alt="Post Link"
      custom
      v-slot="{ navigate }"
    >
      <div
        class="sm:px-0 flex flex-col cursor-pointer"
        @click="navigate"
        @keypress.enter="navigate"
        role="link"
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
            class="my-2 mx-auto max-h-48 bg-white opacity-80 rounded-md"
            :src="imageSrc"
            v-if="imageSrc"
            alt="Thumbnail"
          />
        <user-date-thumbnail
            :name="post.user.displayName"
            :date="readableDate"
            :link="`/${post.user.name}`"
            :thumbnailUrl="post.user.thumbnailUrl"
        
        ></user-date-thumbnail>
          <div class="flex flex-row flex-wrap space-x-2 mt-6">
            <badge class="mt-0 mb-2 mx-0" v-for="tag in post.tags" :key="tag"
              ><nuxt-link
                :to="`/${post.user.name}/posts/?tag=${tag}`"
                class="hover:underline"
              >
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
import Badge from "@/components/Badge";
import UserDateThumbnail from "@/components/UserDateThumbnail";
import { getReadableDate } from "~/services/notebook";

export default {
  name: "post-preview",
  props: ["post"],
  components: { Badge,
  "user-date-thumbnail":  UserDateThumbnail},
  computed: {
    imageSrc() {
      return this.post.thumbnail;
    },
    postLink() {
      if (this.readableDate) {
        // post has not been created yet
        return this.post.user
          ? `/${this.post.user.name}/posts/${this.post.url}`
          : "exampleLink";
      }
      return "#";
    },
    readableDate() {
      let d = getReadableDate(this.post.created);
      return d;
    },
  },
};
</script>

<style>
</style>