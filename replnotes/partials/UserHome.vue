<template>
  <div>
    <div>
      <h1
        class="
          text-center text-5xl
          sm:text-7xl
          tracking-tight
          font-extrabold
          text-indigo-400
          my-6
        "
      >
        {{ user.site.title }}
      </h1>
      <h2
        class="
          text-center text-2xl
          sm:text-4xl
          font-medium
          text-indigo-200
          my-6
        "
      >
        {{ user.site.description }}
      </h2>
    </div>

    <user-posts :userName="user.name" :posts="user.posts"></user-posts>
  </div>
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