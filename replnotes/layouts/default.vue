<template>
  <div class="bg-gray-800">
    <div class="min-h-screen">
      <NavBar
        class="sticky top-0 z-50 bg-gray-800"
        :class="{
          'shadow-2xl bg-gray-800 border-b-2 border-gray-900 border-opacity-75':
            !view.atTopOfPage,
        }"
      />
      <Nuxt />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import NavBar from "@/components/partials/NavBar";
import AppFooter from "@/components/partials/AppFooter";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  components: {
    NavBar,
    AppFooter,
  },
  data() {
    return {
      view: {
        atTopOfPage: true,
      },
    };
  },

  // a beforeMount call to add a listener to the window
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  },

  methods: {
    // the function to call when the user scrolls, added as a method
    handleScroll() {
      // when the user scrolls, check the pageYOffset
      if (window.pageYOffset > 0) {
        // user is scrolled
        if (this.view.atTopOfPage) this.view.atTopOfPage = false;
      } else {
        // user is at top of page
        if (!this.view.atTopOfPage) this.view.atTopOfPage = true;
      }
    },
  },
};
</script>

<style>
</style>
