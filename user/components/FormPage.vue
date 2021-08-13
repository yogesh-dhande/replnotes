<template>
  <section
    class="
      mx-auto
      bg-gray-800
      min-h-screen
      flex flex-1
      justify-center
      py-10
      text-indigo-100
    "
  >
    <div class="w-full h-full leading-loose">
      <div class="max-w-2xl mx-auto">
        <slot> </slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style>
</style>