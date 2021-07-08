<template>
  <div>
    <div>
      <landing />
      <!-- <pricing /> -->
    </div>
  </div>
</template>

<script>
import Landing from "@/partials/Landing";

export default {
  name: "home",
  components: {
    UserPosts,
    Landing,
  },

  layout: "default",
};
</script>

<style>
</style>