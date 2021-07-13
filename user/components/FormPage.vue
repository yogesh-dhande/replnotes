<template>
  <section
    class="
      mx-auto
      bg-gray-800
      min-h-screen
      flex flex-1
      justify-center
      p-10
      text-gray-300
    "
  >
    <div class="text-indigo-100 w-full h-full leading-loose">
      <div class="max-w-lg mx-auto">
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