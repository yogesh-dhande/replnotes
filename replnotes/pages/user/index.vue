<template>
  <div>
    <user-home v-if="siteOwner && siteOwner.name" :user="siteOwner"></user-home>
    <div v-else class="text-4xl text-indigo-200 font-bold p-12 text-center">
      Site Not Found
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import UserHome from "@/partials/UserHome";

export default {
  components: {
    UserHome,
  },
  layout: "custom",

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
  computed: {
    ...mapState(["siteOwner"]),
  },
};
</script>

<style>
</style>