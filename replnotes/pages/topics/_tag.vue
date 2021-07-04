<template>
  <div>
    <h1 class="text-center text-4xl font-bold text-indigo-100 p-6">
      {{ tag }}
    </h1>
    <user-posts
      :userName="userName"
      :queryTags="tags"
      :posts="posts"
    ></user-posts>
  </div>
</template>

<script>
import UserPosts from "@/components/UserPosts";
import { mapState } from "vuex";

export default {
  components: {
    UserPosts,
  },
  head() {
    let name = this.siteOwner.displayName
      ? this.siteOwner.displayName
      : this.siteOwner.name;

    return this.$createSEOMeta({
      title: name + "'s Posts",
      description: name + "'s Posts",
      image: this.siteOwner.photoUrl,
    });
  },
  middleware: "validIfCustomDomain",
  async asyncData(context) {
    let returnData = {
      userName: context.store.state.siteOwner.name,
      tags: [context.params.tag],
      posts: context.store.state.siteOwner.posts,
    };
    return returnData;
  },
  computed: {
    ...mapState(["siteOwner"]),
  },
};
</script>

<style>
</style>