<template>
  <div
    class="
      px-2
      lg:px-12
      py-2
      max-w-6xl
      mx-auto
      lg:py-6
      bg-gray-800
      text-indigo-100
      min-h-screen
    "
  >
    <card class="shadow pt-3 pb-6 px-12 bg-gray-900 bg-opacity-50 mx-auto">
      <h1 class="mb-3 py-2 text-xl font-bold text-center">
        Enter the URL of a Jupyter Notebook to Preview
      </h1>
      <url-slug-input
        class="mt-3"
        prefix="URL"
        v-model="url"
        @change="preview"
      ></url-slug-input>
    </card>
    <notebook :nbJson="nbJson" :key="updateCount" v-if="nbJson" />
  </div>
</template>

<script>
import URLSlugInput from "@/../components/URLSlugInput";
import Notebook from "@/../components/Notebook";
import Card from "@/../components/Card";
import { getNbJsonFromUrl } from "@/../services/notebook";

export default {
  name: "url-preview",
  components: {
    "url-slug-input": URLSlugInput,
    Notebook,
    Card,
  },
  head() {
    return this.$createSEOMeta({
      title: "Preview a Jupyter Notebook URL on REPL Notes",
    });
  },
  middleware: ["invalidOnCustomDomain"],
  data() {
    return {
      url: null,
      updateCount: 0,
      nbJson: null,
    };
  },
  methods: {
    async preview() {
      this.nbJson = await getNbJsonFromUrl(this.url);
    },
  },
};
</script>

<style>
</style>