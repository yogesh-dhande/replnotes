<template>
  <!--Main Col-->
  <div class="max-w-lg sm:max-w-2xl px-4 mx-auto pb-12 sm:pb-24">
    <div
      class="
        flex flex-col
        items-center
        mt-6
        sm:mt-12
        text-center text-indigo-100
        space-y-4
      "
    >
      <!-- Image for mobile view-->
      <thumbnail
        v-if="user.photoUrl"
        class="block h-64 w-64 sm:h-80 sm:w-80"
        :src="user.photoUrl"
      />

      <h1 class="text-4xl sm:text-5xl font-bold text-indigo-100 pt-8">
        {{ user.displayName }}
      </h1>
      <p v-if="user.title" class="my-2 text-xl sm:text-2xl font-medium">
        {{ user.title }}
      </p>
      <p v-if="user.location" class="my-2 text-xl sm:text-2xl font-medium">
        {{ user.location }}
      </p>
      <div class="mt-2 flex flex-row flex-wrap justify-center">
        <badge v-for="tag in tags" :key="tag" class="mx-2 my-2"
          ><nuxt-link :to="topicLink(tag)" class="italic hover:underline">
            {{ tag }}</nuxt-link
          ></badge
        >
      </div>
    </div>
    <social-links
      v-if="user.social"
      :user="user"
      class="mt-4 mb-8"
    ></social-links>

    <markdown :key="user.aboutMe" class="mx-auto" :text="user.aboutMe" />
  </div>
</template>

<script>
import Markdown from '@/components/Markdown'
import Badge from '@/components/Badge'
import Thumbnail from '@/components/Thumbnail'

export default {
  name: 'About',
  components: { Markdown, Badge, Thumbnail },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    tags() {
      if (!this.user || !this.user.posts) {
        return []
      }
      const tagList = Object.values(this.user.posts).map((post) => {
        return post.tags
      })

      return [...new Set([].concat.apply([], tagList))]
    },
    topicLink() {
      return (tag) => {
        return this.user ? `/topics/${tag}` : '#'
      }
    },
  },
}
</script>

<style>
</style>