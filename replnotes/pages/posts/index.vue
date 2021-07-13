<template>
  <create-post
    @cancel="$router.push('/dashboard')"
    @save="$router.push('/dashboard')"
  ></create-post>
</template>

<script>
export default {};
</script>

<style>
</style>