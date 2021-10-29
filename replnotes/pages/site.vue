<template>
  <form-page>
    <site-settings
      @cancel="$router.push('/dashboard')"
      @save="$router.push('/dashboard')"
      :site="site"
      v-if="site"
      class="max-w-2xl mx-auto"
    ></site-settings>
  </form-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  middleware: ["auth"],
  computed: {
    ...mapState(["site"]),
  },
};
</script>

<style>
</style>