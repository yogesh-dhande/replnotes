<template>
  <demo-component></demo-component>
</template>

<script>
import DemoComponent from "@/components/DemoComponent.vue";
export default {
  components: {
    DemoComponent,
  },
  head() {
    return this.$createSEOMeta({
      title: "REPL Notes Demo",
    });
  },
};
</script>

<style>
</style>