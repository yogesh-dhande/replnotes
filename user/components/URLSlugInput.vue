<template>
  <div class="col-span-3 sm:col-span-2 text-sm">
    <label for="company_website" class="block font-medium mt-2 mb-0">
      {{ label }}
    </label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <span
        v-if="prefix"
        class="inline-flex items-center px-3 rounded-l-md bg-gray-700"
      >
        {{ prefix }}
      </span>
      <input
        type="text"
        class="
          focus:ring-gray-500
          focus:border-gray-500
          flex-1
          block
          w-full
          rounded-none rounded-r-md
          bg-gray-800
          p-2
        "
        :placeholder="value"
        :value="value"
        @input="handleInput"
        @change="handleChange"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
      />
      <span
        v-if="suffix"
        class="inline-flex items-center px-3 rounded-r-md bg-gray-700"
      >
        {{ suffix }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    prefix: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
    handleChange(e) {
      this.$emit('change', e.target.value)
    },
  },
}
</script>

<style>
</style>