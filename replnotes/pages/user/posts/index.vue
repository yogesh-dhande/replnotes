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
    let name = this.siteOwner.displayName
      ? this.siteOwner.displayName
      : this.siteOwner.name;

    return this.$createSEOMeta({
      title: name + "'s Posts",
      description: name + "'s Posts @ REPL Notes",
      image: this.siteOwner.photoUrl,
    });
  },
  middleware: ["validIfCustomDomain"],
  layout: "custom",

  computed: {
    ...mapState(["siteOwner"]),
  },
};
</script>

<style>
</style>