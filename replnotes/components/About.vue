<template>
  <!--Main Col-->
  <div>
    <div
      class="flex flex-col items-center mt-6 sm:mt-12 text-center text-gray-300"
    >
      <!-- Image for mobile view-->
      <thumbnail class="block h-64 w-64 sm:h-80 sm:w-80" :src="user.photoUrl" />

      <h1 class="text-4xl sm:text-5xl font-bold text-indigo-100 pt-8">
        {{ user.displayName }}
      </h1>
      <p v-if="user.title" class="mt-2 text-xl sm:text-2xl font-medium">
        {{ user.title }}
      </p>
      <p v-if="user.location" class="mt-2 text-xl sm:text-2xl font-medium">
        {{ user.location }}
      </p>

      <nuxt-link
        v-if="user.posts"
        :to="`/${user.name}/posts`"
        class="mt-2 text-lg sm:text-xl font-semibold hover:text-indigo-100"
      >
        <h1>
          {{ Object.values(user.posts).length }}
          <span v-if="Object.values(user.posts).length > 1">posts</span>
          <span v-else>post</span>
        </h1>
      </nuxt-link>
      <div class="mt-2 flex flex-row flex-wrap justify-center">
        <badge class="mx-2 my-2" v-for="tag in tags" :key="tag"
          ><nuxt-link
            :to="`/${user.name}/posts/?tag=${tag}`"
            class="italic hover:underline"
          >
            {{ tag }}</nuxt-link
          ></badge
        >
      </div>
    </div>
    <markdown class="mx-auto" :text="user.aboutMe" :key="user.aboutMe" />
    <social-links :user="user"></social-links>
  </div>
</template>

<script>
import Markdown from "@/components/Markdown";
import Badge from "@/components/Badge";
import Thumbnail from "@/components/Thumbnail";

export default {
  name: "about",
  components: { Markdown, Badge, Thumbnail },
  props: ["user"],
  computed: {
    tags() {
      if (!this.user || !this.user.posts) {
        return [];
      }
      let tagList = Object.values(this.user.posts).map((post) => {
        return post.tags;
      });

      return [...new Set([].concat.apply([], tagList))];
    },
  },
};
</script>

<style>
</style>