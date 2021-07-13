<template>
  <form-page>
    <site-settings
      @cancel="$router.push('/dashboard')"
      @save="$router.push('/dashboard')"
      :user="currentUser"
    ></site-settings>
  </form-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>

<style>
</style>