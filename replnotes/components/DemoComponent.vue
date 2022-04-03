<template>
  <section
    id="demo"
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
    <div
      class="
        shadow
        mt-6
        sm:mt-12
        py-6
        sm:py-12
        px-12
        bg-gray-900 bg-opacity-50
        mx-auto
      "
    >
      <h1 class="mb-3 py-2 text-xl sm:text-2xl font-bold text-center">
        {{ pageTitle }}
      </h1>

      <file-input
        v-model="file"
        class="mt-6 bg-gray-700"
        ref-key="landing-demo"
        @input="fileErrors = []"
        @change="validateFile"
      ></file-input>
      <div v-if="file && fileErrors.length == 0">
        <text-input v-model="title" class="mt-3" label="Title"></text-input>
      </div>
      <h2 v-else class="text-center mt-3">
        You can download a sample notebook
        <a
          class="text-indigo-400 hover:text-indigo-600"
          data-splitbee-event="Download Demo File"
          href="https://firebasestorage.googleapis.com/v0/b/nbtoblog-8a03f.appspot.com/o/demo_jupyter_notebook.ipynb?alt=media&token=1898f691-a7d2-497d-ab73-41c4e2b383bc"
          download
        >
          here
        </a>
        to use in the demo.
      </h2>
    </div>
    <div v-if="nbJson" :key="updateCount" class="mx-4">
      <h1 class="text-3xl lg:text-4xl font-extrabold my-6 tracking-tight">
        {{ title }}
      </h1>
      <notebook class="my-6 text-indigo-200" :nb-json="nbJson"> </notebook>
    </div>
  </section>
</template>

<script>
import { getNbJsonFromFile } from "@/services/notebook";
import Notebook from "@/components/Notebook";
import FileInput from "@/components/FileInput";

export default {
  name: "Demo",
  components: {
    Notebook,
    FileInput,
  },
  data() {
    return {
      file: null,
      fileErrors: [],
      nbJson: null,
      updateCount: 0,
      title: "Add a custom title to the post",
      pageTitle: "Live Demo: Create and Preview a Blog Post",
    };
  },
  computed: {
    fileType() {
      if (this.file) {
        return this.file.name.substr(
          this.file.name.lastIndexOf(".") + 1,
          this.file.length
        );
      }
      return null;
    },
  },
  watch: {
    async file(newValue) {
      this.nbJson = null;
      await this.handleFileChange(newValue);
      this.updateCount += 1;
    },
  },
  methods: {
    async handleFileChange(newValue) {
      if (newValue) {
        if (this.fileErrors.length === 0) {
          try {
            this.$splitbee.track("Upload Demo File");
            this.nbJson = await getNbJsonFromFile(newValue);
          } catch (error) {
            this.fileErrors.push(error.message);
            this.$splitbee.track("Error", { errors: this.fileErrors });
          }
        }
      }
    },
    validateFile() {
      this.fileErrors = [];
      if (!this.file) {
        this.fileErrors.push(
          "Please upload a Jupyter Notebook to create a post."
        );
      } else if (this.fileType !== "ipynb") {
        this.fileErrors.push("Only Jupyter Notebooks are supported");
      } else if (this.file.size > 10 * 1024 * 1024) {
        this.fileErrors.push("Files larger than 10 MB are not supported.");
      }

      if (this.fileErrors.length > 0) {
        this.$splitbee.track("Error", { errors: this.fileErrors });
      }
    },
  },
};
</script>

<style>
</style>