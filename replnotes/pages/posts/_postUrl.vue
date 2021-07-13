<template>
  <form-page v-if="currPost.id">
    <edit-post :post="currPost" @cancel="$router.push('/dashboard')" />
  </form-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  asyncData(context) {
    return {
      postUrl: context.params.postUrl,
    };
  },
  computed: {
    ...mapGetters(["post"]),
    currPost() {
      return this.post(this.postUrl);
    },
  },
};
</script>

<style>
</style>