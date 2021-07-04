<template>
  <user-posts
    :userName="userName"
    :queryTags="queryTags"
    :posts="posts"
  ></user-posts>
</template>

<script>
import UserPosts from "@/components/UserPosts";

export default {
  components: {
    UserPosts,
  },
  head() {
    let name = this.user.displayName ? this.user.displayName : this.userName;

    return this.$createSEOMeta({
      title: name + "'s Posts",
      description: name + "'s Posts @ REPL Notes",
      image: this.user.photoUrl,
      canonical: this.tags.length == 0,
    });
  },
  middleware: ["invalidOnCustomDomain"],
  async asyncData(context) {
    let returnData = {
      userName: context.params.userName,
      queryTags: context.query.tag ? context.query.tag : [],
      posts: [],
      user: {},
    };

    let querySnapshot = await context.app.$postsCollection
      .where("user.name", "==", returnData.userName)
      .get();

    if (!querySnapshot.empty) {
      returnData.posts = querySnapshot.docs.map((doc) => doc.data());
      returnData.user = returnData.posts[0].user;
    }
    return returnData;
  },
  computed: {
    tags() {
      return Array.isArray(this.queryTags) ? this.queryTags : [this.queryTags];
    },
  },
  watch: {
    queryTags(newValue) {
      this.tags = Array.isArray(newValue) ? newValue : [newValue];
    },
  },
};
</script>

<style>
</style>