<template>
    <div class="min-h-screen bg-gray-800">
    <NavBar />
    <Nuxt />
    <AppFooter />
  </div>
</template>

<script>

import NavBar from '~/components/NavBar'
export default {
  components: {
    NavBar
  }
}
</script>

<style>

</style>
