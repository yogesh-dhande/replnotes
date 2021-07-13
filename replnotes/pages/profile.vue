<template>
  <form-page>
    <profile
      @cancel="$router.push('/dashboard')"
      @save="$router.push('/dashboard')"
      :currentUser="currentUser"
    ></profile>
  </form-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  middleware: ["auth"],
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>

<style>
</style>