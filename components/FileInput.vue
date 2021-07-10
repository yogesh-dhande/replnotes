<template>
  <div
    class="
      mt-2
      flex
      justify-center
      pt-2
      pb-2
      bg-gray-800
      rounded-md
      border border-indigo-100 border-dashed border-opacity-10
    "
    @drop.prevent="handleFileDrop"
    @dragover.prevent
  >
    <div class="space-y-1 text-center">
      <div class="text-md">
        <label :for="refKey">
          Upload a
          <span
            class="
              relative
              cursor-pointer
              rounded-md
              font-medium
              text-indigo-300
              hover:text-indigo-500
              focus-within:outline-none
              focus-within:ring-2
              focus-within:ring-offset-2
              focus-within:ring-indigo-500
            "
            >Jupyter notebook</span
          >
          <input
            :id="refKey"
            name="file-upload"
            type="file"
            class="sr-only"
            :ref="refKey"
            @change="handleFileInput"
          />
        </label>
        <span class="pl-1">or drag and drop</span>
      </div>
      <p class="text-md text-indigo-300 font-bold" v-if="file">
        Selected File: {{ file.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "file-input",
  props: ["refKey"],
  data() {
    return {
      file: null,
    };
  },
  methods: {
    handleFileInput() {
      this.selectFile(this.$refs[this.refKey].files[0]);
    },
    handleFileDrop(event) {
      let droppedFiles = event.dataTransfer.files;
      if (droppedFiles) {
        this.selectFile(droppedFiles[0]);
      }
    },
    selectFile(file) {
      this.file = file;
      this.$emit("input", this.file);
      this.$emit("change", this.file);
    },
  },
};
</script>

<style>
</style>