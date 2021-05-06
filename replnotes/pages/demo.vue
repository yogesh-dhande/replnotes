<template>
  <div
    class="px-2 lg:px-12 py-2 max-w-6xl mx-auto lg:py-6 bg-gray-800 text-indigo-100 min-h-screen"
  >
    <card
      class="shadow pt-3 pb-6 px-12 bg-gray-900 bg-opacity-50 max-w-2xl mx-auto"
    >
      <h2 class="mb-3 py-2 text-xl font-bold text-center">
        {{ pageTitle }}
      </h2>

      <file-input
        class="mt-3 bg-gray-700"
        v-model="file"
        refKey="demo"
        @input="fileErrors = []"
        @change="validateFile"
      ></file-input>
      <div v-if="file && fileErrors.length == 0">
        <text-input class="mt-3" label="Title" v-model="title"></text-input>
      </div>
    </card>
    <div class="mx-4" v-if="nbJson" :key="updateCount">
      <h1 class="text-3xl lg:text-4xl font-extrabold my-6 tracking-tight">
        {{ title }}
      </h1>
      <notebook class="my-6 text-indigo-200" :nbJson="nbJson"> </notebook>
    </div>
  </div>
</template>

<script>
import { getNbJsonFromFile } from "~/services/notebook";
import Notebook from "@/components/Notebook";
import Card from "@/components/Card";
import FileInput from "@/components/FileInput";

export default {
  name: "demo",
  components: {
    Notebook,
    FileInput,
    Card,
  },
  head() {
    return this.$createSEOMeta({
      title: this.pageTitle,
    });
  },
  data() {
    return {
      file: null,
      fileErrors: [],
      nbJson: null,
      updateCount: 0,
      title: "Add a custom title to the post",
      pageTitle: "Preview a Jupyter Notebook as a Blog Post",
    };
  },
  watch: {
    async file(newValue) {
      this.nbJson = null;
      await this.handleFileChange(newValue);
      this.updateCount += 1;
    },
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
  methods: {
    async handleFileChange(newValue) {
      if (newValue) {
        if (this.fileErrors.length == 0) {
          try {
            this.nbJson = await getNbJsonFromFile(newValue);
          } catch (error) {
            this.fileErrors.push(error.message);
            this.fileErrors.push("Only Jupyter Notebooks are supported.");
          }
        }
      }
    },
    parseMagicTags(line) {
      let commands = line.split(":");
      let key = commands[0].trim().replace(" ", "").toLowerCase();
      let value = commands.length > 1 ? commands[1].trim() : "";
      if (key.includes("#title")) {
        this.title = value;
      } else if (key.includes("#url")) {
        this.url = value;
      } else if (key.includes("#description")) {
        this.description = value;
      } else if (key.includes("#tags")) {
        this.tags = value.split(",").map((tag) => tag.trim());
      }
    },
    validateFile() {
      this.fileErrors = [];
      if (!this.file) {
        this.fileErrors.push(
          "Please upload a Jupyter Notebook to create a post."
        );
      } else {
        if (this.fileType != "ipynb") {
          this.fileErrors.push("Only Jupyter Notebooks are supported");
        } else if (this.file.size > 10 * 1024 * 1024) {
          this.fileErrors.push("Files larger than 10 MB are not supported.");
        }
      }
    },
  },
};
</script>

<style>
</style>