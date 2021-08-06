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
        class="sm:px-0 flex flex-col lg:flex-row cursor-pointer"
        role="link"
        @click="navigate"
        @keypress.enter="navigate"
      >
        <img
          v-if="imageSrc"
          class="
            my-2
            mx-auto
            max-h-48
            bg-white
            opacity-80
            rounded-md
            hidden
            lg:block
          "
          :src="imageSrc"
          alt="Thumbnail"
        />
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
            class="
              my-2
              mx-auto
              max-h-48
              bg-white
              opacity-80
              rounded-md
              lg:hidden
            "
            :src="imageSrc"
            alt="Thumbnail"
          />
          <user-date-thumbnail
            :name="post.user.displayName"
            :date="readableDate"
            :link="`/about`"
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
        return this.post.user
          ? `/${this.post.user.name}/posts/${this.post.url}`
          : "exampleLink";
      }
      return "#";
    },
    topicLink() {
      return (tag) => {
        if (this.siteOwner) {
          return `/topics/${tag}`;
        }
        return `/${this.post.user.name}/posts/?tag=${tag}`;
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