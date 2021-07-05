<template>
  <card class="mx-auto shadow items-center bg-gray-900 text-indigo-200">
    <h2 class="mb-3 py-2 text-xl font-bold">Customize Your Website</h2>
    <text-input v-model="site.title" label="Title" class="mt-3"></text-input>
    <text-area-input
      v-model="site.description"
      label="Description"
      class="mt-3"
    ></text-area-input>
    <!-- Add a favicon -->
    <!-- <image-uploader
      v-model="favicon"
      :imageSrc="site.favicon"
      label="Upload a favicon"
      refKey="favicon"
      class="mt-3"
    ></image-uploader> -->
    <label for="navbar-builder" class="block mt-3 px-2">Navigation Menu</label>
    <div id="navbar-builder" class="flex flex-col space-y-2">
      <div v-for="(navItem, i) in site.navbar" :key="i" class="mt-3">
        <nav-item-builder
          v-bind="navItem"
          @delete="() => site.navbar.splice(i, 1)"
          @save="(val) => (site.navbar[i] = val)"
        ></nav-item-builder>
      </div>
      <button
        @click="addNavItem"
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
        Add a link
      </button>
    </div>
    <save-cancel
      class="my-3"
      :isLoading="isLoading"
      :errors="errors"
      @save="save"
      @cancel="cancel"
    />
  </card>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showButtons: true,
      editMode: false,
      site: {
        title: this.user.site ? this.user.site.title : "",
        description: this.user.site ? this.user.site.description : "",
        // favicon: this.user.site ? this.user.site.favicon : "",
        navbar:
          this.user.site && this.user.site.navbar
            ? this.user.site.navbar
            : [
                {
                  label: "Home",
                  external: false,
                  url: "/",
                },
                {
                  label: "About",
                  external: false,
                  url: "/about",
                },
              ],
      },
      favicon: null,
      isLoading: false,
      errors: [],
    };
  },
  methods: {
    async save() {
      try {
        this.isLoading = true;
        await this.$usersCollection.doc(this.user.id).update({
          site: this.site,
        });
        this.cancel();
      } catch (error) {
        this.errors.push(error.message);
      } finally {
        this.isLoading = false;
      }
    },
    cancel() {
      this.$emit("cancel");
    },
    clearErrors() {
      this.erros = [];
    },
    addNavItem() {
      this.site.navbar.push({
        label: "Home",
        external: false,
        url: "/",
      });
    },
  },
};
</script>

<style>
</style>