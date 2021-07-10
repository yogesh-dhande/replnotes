<template>
  <div class="my-3 max-w-lg mx-auto grid gap-0 xl:grid-cols-3 xl:max-w-none">
    <div v-for="(postList, i) in postsColumns" :key="i" class="flex flex-col">
      <post-list-item
        v-for="post in postList"
        :key="post.id"
        class="mt-6"
        :post="post"
      >
      </post-list-item>
    </div>
  </div>
</template>

<script>
import PostListItem from '@/components/PostListItem'

export default {
  name: 'PostList',
  components: {
    'post-list-item': PostListItem,
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      numCols: 3,
    }
  },
  computed: {
    postsColumns() {
      const indexes = [...Array(this.numCols).keys()]
      return indexes.map((i) =>
        this.posts.filter((_, j) => j % this.numCols === i)
      )
    },
  },
}
</script>

<style>
</style>