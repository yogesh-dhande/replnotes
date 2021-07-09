<template>
  <div>
    <page-not-found v-if="error.statusCode === 404" />
    <an-error-occured v-else />
  </div>
</template>

<script>
import AnErrorOccured from "@/partials/AnErrorOccured.vue";
import PageNotFound from "@/partials/PageNotFound.vue";

export default {
  components: { AnErrorOccured, PageNotFound },
  props: ["error"],
  layout: ({ store }) => (store.state.siteOwner.name ? "custom" : "default"),
};
</script>