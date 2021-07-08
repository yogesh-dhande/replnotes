<template>
  <about :user="siteOwner" />
</template>

<script>
import { mapState } from "vuex";

export default {
  layout: "custom",
  middleware: "validIfCustomDomain",
  computed: {
    ...mapState(["siteOwner"]),
  },
};
</script>

<style>
</style>