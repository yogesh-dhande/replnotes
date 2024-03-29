<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mt-2 mb-0">
      {{ label }}
    </label>
    <div class="mt-2 flex items-center">
      <img
        v-if="thumbnailSrc"
        :src="thumbnailSrc"
        alt="Thumbnail"
        class="w-9/12 bg-white rounded opacity-80"
      />
      <button
        type="button"
        class="
          bg-white
          py-2
          px-3
          border border-gray-300
          rounded-md
          shadow-sm
          text-sm
          leading-4
          font-medium
          text-gray-700
          hover:bg-gray-50
          focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        "
        :class="{ 'ml-5': thumbnailSrc }"
        @click="showModal = true"
      >
        <span v-if="thumbnailSrc">Change</span>
        <span v-else>Pick a Thumbnail</span>
      </button>
    </div>

    <modal :show="showModal" @close="closeModal">
      <div
        class="
          inline-block
          align-bottom
          bg-white
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-16
          sm:align-middle
          max-w-sm
          sm:max-w-lg
          md:max-w-xl
          lg:max-w-3xl
          sm:w-full
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <window>
          <template #top-right>
            <button
              class="m-2 p-2 text-gray-500 h-10 w-10 hover:text-pink-600"
              @click="closeModal"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </template>
          <template #body>
            <div class="bg-gray-700 px-4 py-4 sm:p-6 sm:pb-4">
              <div
                class="
                  grid grid-cols-1
                  mt-4
                  px-4
                  sm:grid-cols-2
                  lg:grid-cols-3
                  gap-4
                "
              >
                <button
                  class="
                    border border-gray-500
                    rounded
                    hover:shadow-2xl
                    text-indigo-100
                  "
                  @click="() => select(null)"
                >
                  No Thumbnail
                </button>
                <button
                  v-for="(imageSrc, i) in thumbnails"
                  :key="i"
                  class="mx-auto rounded hover:shadow-2xl"
                  @click="() => select(imageSrc)"
                >
                  <img :src="imageSrc" alt="Thumbnail" class="rounded" />
                </button>
              </div>
            </div>
          </template>
        </window>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
import Window from "@/components/Window";

export default {
  name: "ImagePicker",
  components: { Modal, Window },
  props: {
    label: {
      type: String,
      default: "",
    },
    thumbnails: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      thumbnailSrc: this.value,
      showModal: false,
    };
  },
  watch: {
    thumbnailSrc(newVal) {
      this.$emit("input", newVal);
      this.$emit("change", newVal);
    },
    thumbnails(newVal) {
      try {
        this.thumbnailSrc = newVal[0];
      } catch (error) {
        this.thumbnailSrc = null;
      }
    },
  },
  mounted() {
    if (!this.value && this.thumbnails.length > 0) {
      this.thumbnailSrc = this.thumbnails[0];
    }
  },
  methods: {
    select(val) {
      this.thumbnailSrc = val;
      this.closeModal();
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style>
</style>