<template>
  <div class="px-2 lg:px-12 py-2 lg:py-6 bg-gray-800 min-h-screen">
    <post-list :posts="featuredPosts"></post-list>
  </div>
</template>

<script>
import PostList from "@/components/PostList";

export default {
  name: "discover",
  components: {
    PostList,
  },
  head() {
    return this.$createSEOMeta({
      title: "Discover Content on REPL Notes",
    });
  },
  middleware: ["invalidOnCustomDomain"],
  data() {
    return {
      featuredPosts: [],
    };
  },
  mounted() {
    this.$postsCollection
      .orderBy("file.size")
      .limit(20)
      .get()
      .then((querySnapshot) => {
        this.featuredPosts = [];
        querySnapshot.forEach((doc) => {
          this.featuredPosts.push(doc.data());
        });
      });
  },
};
</script>

<style>
</style>