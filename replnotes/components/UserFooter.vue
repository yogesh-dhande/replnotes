<template>
  <footer class="bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
    <social-links :user="user" v-if="user.social"></social-links>
    <p class="text-center text-base text-indigo-200">
      &copy; {{ new Date().getFullYear() }}
      {{ user.displayName ? user.displayName : user.name }}, All Rights
      Reserved.
    </p>
  </footer>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
</style>