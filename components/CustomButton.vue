<template>
  <button
    type="submit"
    class="
      w-full
      inline-flex
      justify-center
      py-2
      px-4
      border border-transparent
      shadow-sm
      text-md
      font-bold
      rounded-md
      text-white
      hover:text-indigo-100
      bg-gradient-to-r
      from-indigo-600
      to-indigo-500
      hover:from-indigo-700
      hover:to-indigo-800
      focus:ring-4 focus:ring-indigo-200
      focus:bg-indigo-700
      disabled:opacity-50
    "
    @click="(e) => $emit('click', e)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
}
</script>

<style>
</style>