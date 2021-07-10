<template>
  <div>
    <div class="px-4 py-3 sm:px-6">
      <errors :errors="errors" v-if="errors.length > 0" />
      <errors
        :errors="['Please correct all errors before proceeding.']"
        v-else-if="disabled"
      />
      <div class="sm:flex sm:flex-row-reverse" v-if="!isLoading">
        <button
          type="button"
          @click="$emit('save')"
          class="
            w-full
            inline-flex
            justify-center
            rounded-md
            border border-transparent
            shadow-sm
            px-4
            py-2
            bg-indigo-600
            text-base
            font-medium
            text-white
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            sm:ml-3
            sm:w-auto
            sm:text-sm
            disabled:opacity-50
            disabled:hover:bg-indigo-600
          "
          :disabled="errors.length > 0 || disabled"
        >
          Save
        </button>

        <button
          type="button"
          @click="$emit('cancel')"
          class="
            mt-3
            w-full
            inline-flex
            justify-center
            rounded-md
            border border-gray-300
            shadow-sm
            px-4
            py-2
            bg-gray-100
            text-base
            font-medium
            text-gray-700
            hover:bg-gray-300
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            sm:mt-0
            sm:ml-3
            sm:w-auto
            sm:text-sm
          "
        >
          Cancel
        </button>
      </div>
      <div class="h-8 w-full rounded boder boder-indigo-300" v-else>
        <div
          class="
            bar
            p-1
            flex
            justify-end
            bg-gradient-to-r
            from-indigo-500
            to-indigo-700
            rounded
          "
          :style="{ width: progress + '%' }"
        >
          <span class="text-sm">{{ progress }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Errors from "@/../components/Errors";

export default {
  name: "save-cancel",
  props: {
    isLoading: {
      default: false,
    },
    progress: {
      default: 0,
    },
    errors: {
      default: () => [],
    },
    disabled: {
      default: false,
    },
  },
  components: {
    Errors,
  },
};
</script>

<style scoped>
</style>