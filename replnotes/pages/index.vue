<template>
  <div>
    <div v-if="!siteOwner.name">
      <landing />
      <!-- <pricing /> -->
    </div>
    <div v-else>
      <user-home :user="siteOwner"></user-home>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserPosts from "@/components/UserPosts";

export default {
  name: "home",
  components: {
    UserPosts,
  },
  head() {
    if (this.siteOwner.name) {
      let name = this.siteOwner.displayName
        ? this.siteOwner.displayName
        : this.siteOwner.name;
      return this.$createSEOMeta({
        title:
          this.siteOwner.site && this.siteOwner.site.title
            ? this.siteOwner.site.title
            : name + "'s Posts", // replace with site title
        description:
          this.siteOwner.site && this.siteOwner.site.description
            ? this.siteOwner.site.description
            : name + "'s Posts", // replace with site description
        image: this.siteOwner.photoUrl,
      });
    }
  },
  layout: ({ store }) => (store.state.siteOwner.name ? "custom" : "default"),
  computed: {
    ...mapState(["siteOwner"]),
  },
};
</script>

<style>
</style>