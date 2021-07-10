<template>
  <div>
    <h2 class="text-gray-700 mb-3 py-2 text-xl font-bold text-indigo-600">
      {{ heading }}
    </h2>
    <div v-if="file">
      <h2 class="text-gray-700 mb-3 text-xl">Preview</h2>
      <post-preview :post="post"></post-preview>
    </div>
    <file-input
      v-model="file"
      :refKey="post.id"
      @change="(val) => $emit('change', { key: 'file', value: val })"
    ></file-input>
    <url-slug-input
      class="mt-3"
      label="Post URL"
      :prefix="baseUrl"
      :value="post.url"
      @input="$emit('input')"
      @change="(val) => $emit('change', { key: 'url', value: val })"
    ></url-slug-input>
    <text-input
      label="Title"
      class="mt-3"
      :value="post.title"
      @input="(v) => $emit('input', v)"
      @change="(val) => $emit('change', { key: 'title', value: val })"
    ></text-input>
    <text-area-input
      class="mt-3"
      label="Description"
      :value="post.description"
      @input="$emit('input')"
      @change="(val) => $emit('change', { key: 'description', value: val })"
    ></text-area-input>
    <multi-choice
      id="tags"
      class="mt-3"
      label="Tags"
      :value="[...post.tags] || []"
      :options="userTags"
      allowInsertionOfNewKeys
      @input="(val) => $emit('change', { key: 'tags', value: val })"
    ></multi-choice>
    <image-picker
      v-if="thumbnails.length > 0"
      :thumbnails="thumbnails"
      v-model="post.thumbnail"
      @change="(val) => $emit('change', { key: 'thumbnail', value: val })"
    >
    </image-picker>
  </div>
</template>

<script>
import ImagePicker from "@/../components/ImagePicker";
import FileInput from "@/../components/FileInput";
import URLSlugInput from "@/../components/URLSlugInput";
import TextInput from "@/../components/TextInput";
import TextAreaInput from "@/../components/TextAreaInput";
import MultiChoice from "@/../components/MultiChoice";
import PostPreview from "@/../components/PostPreview";
import { mapGetters, mapState } from "vuex";
import {
  readFile,
  parseThumbnailsFromNbJson,
  downloadNotebook,
} from "@/../services/notebook";

export default {
  name: "post-editor",
  props: ["heading", "post"],
  components: {
    "image-picker": ImagePicker,
    "file-input": FileInput,
    "url-slug-input": URLSlugInput,
    "text-input": TextInput,
    "text-area-input": TextAreaInput,
    "post-preview": PostPreview,
    "multi-choice": MultiChoice,
  },
  data() {
    return {
      file: null,
      content: null,
      thumbnails: [],
      isLoading: false,
      thumbnailSrc: null,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
    ...mapGetters(["userPostUrls", "userTags"]),
    baseUrl() {
      return `${process.env.NUXT_ENV_BASE_URL}/${this.currentUser.name}/posts/`;
    },
  },
  mounted() {
    if (this.post.url) {
      downloadNotebook(this.post.file.url, (file) => {
        this.file = file;
      });
    }
  },
  watch: {
    file(newValue) {
      if (newValue && typeof newValue !== Blob) {
        this.content = null;
        this.thumbnails = [];
        this.thumbnailSrc = null;

        readFile(newValue)
          .then((text) => {
            this.content = JSON.parse(text);
            this.thumbnails = parseThumbnailsFromNbJson(this.content);
          })
          .catch((error) => {
            this.$emit("error", error.message);
            this.$emit("error", "Only Jupyter Notebooks are supported");
          });
      }
    },
  },
};
</script>

<style>
</style>