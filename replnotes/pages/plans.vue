<template>
  <section>
    <h1
      class="
        text-4xl
        font-bold
        text-indigo-400
        sm:text-5xl
        text-center
        my-4
        sm:my-8
      "
    >
      Choose your plan
    </h1>
    <pricing />
  </section>
</template>

<script>
import Pricing from "@/components/partials/Pricing.vue";
export default {
  components: { Pricing },
  middleware: ["validOnFreeAccount"],
};
</script>

<style>
</style>