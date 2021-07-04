<template>
  <user-posts :userName="siteOwner.name" :posts="siteOwner.posts"></user-posts>
</template>

<script>
import UserPosts from "@/components/UserPosts";
import { mapState } from "vuex";

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
    });
  },
  middleware: ["validIfCustomDomain"],

  computed: {
    ...mapState(["siteOwner"]),
  },
};
</script>

<style>
</style>