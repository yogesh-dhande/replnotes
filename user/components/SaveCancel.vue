<template>
  <div>
    <div class="px-4 py-3 sm:px-6">
      <errors v-if="errors.length > 0" :errors="errors" />
      <errors
        v-else-if="disabled"
        :errors="['Please correct all errors before proceeding.']"
      />
      <div v-if="!isLoading" class="mt-3 sm:flex sm:flex-row-reverse">
        <button
          type="button"
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
          @click="$emit('save')"
        >
          Save
        </button>

        <button
          type="button"
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
          @click="$emit('cancel')"
        >
          Cancel
        </button>
      </div>
      <div v-else class="h-8 w-full rounded boder boder-indigo-300">
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
import Errors from '@/components/Errors'

export default {
  name: 'SaveCancel',
  components: {
    Errors,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Number,
      default: 0,
    },
    errors: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
</style>