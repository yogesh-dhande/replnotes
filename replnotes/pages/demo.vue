<template>
  <demo-component></demo-component>
</template>

<script>
export default {
  head() {
    return this.$createSEOMeta({
      title: "REPL Notes Demo",
    });
  },
  middleware: ["invalidOnCustomDomain"],
};
</script>

<style>
</style>