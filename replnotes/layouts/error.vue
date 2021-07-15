<template>
  <div>
    <page-not-found v-if="error.statusCode === 404" />
    <an-error-occured v-else />
  </div>
</template>

<script>
import AnErrorOccured from "@/components/partials/AnErrorOccured.vue";
import PageNotFound from "@/components/partials/PageNotFound.vue";

export default {
  components: { AnErrorOccured, PageNotFound },
  props: ["error"],
};
</script>