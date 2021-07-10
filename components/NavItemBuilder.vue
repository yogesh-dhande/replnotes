<template>
  <div @mouseover="showButtons = true" @mouseleave="showButtons = false">
    <div
      v-if="!editMode"
      class="shadow-lg bg-gray-900 bg-opacity-25 hover:bg-opacity-50"
    >
      <window>
        <template v-slot:top-right v-if="showButtons">
          <icon-button @click="editMode = true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </icon-button>
          <button
            class="mx-2 p-1.5 text-pink-500 h-8 w-8 hover:text-pink-700"
            @click="deleteLink"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </template>
        <template v-slot:body>
          <h2 class="bg-gray-800 px-3 py-2 rounded">{{ navItem.label }}</h2>
        </template>
      </window>
    </div>
    <div class="flex flex-col space-y-2 bg-gray-900 p-4 mt-2" v-else>
      <text-input v-model="navItem.label" label="Link Text"></text-input>
      <toggle
        v-model="navItem.external"
        label="External URL"
        class="block mt-2"
      />
      <text-input v-model="navItem.url" label="URL"></text-input>
            <button
        @click="save"
        class="
          px-3
          py-2
          bg-indigo-600
          hover:bg-indigo-700
          text-indigo-100
          font-medium
          rounded
        "
      >
        Save
      </button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Home",
    },
    external: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: "/",
    },
  },
  data() {
    return {
      editMode: false,
      showButtons: true,
      navItem: {
        label: this.label,
        external: this.external,
        url: this.url,
      },
      errors: [],
    };
  },
  methods: {
    deleteLink() {
      this.$emit("delete");
    },
    save() {
      this.$emit("save", this.navItem);
      this.editMode = false;
    },
  },
};
</script>

<style>
</style>