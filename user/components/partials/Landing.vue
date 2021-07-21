<template>
  <div class="bg-gray-800 text-indigo-100">
    <div
      class="
        md:max-w-4xl
        lg:max-w-5xl
        mx-auto
        text-center
        px-2
        sm:px-6
        py-12
        sm:py-16
        lg:py-24
        lg:px-8
      "
    >
      <div class="flex flex-col place-items-center px-2 sm:px-8">
        <h1
          class="
            text-center text-5xl
            sm:text-7xl
            lg:text-8xl
            tracking-tight
            font-extrabold
            text-indigo-400
          "
        >
          Jupyter Notebooks
          <span class="text-indigo-100">
            <span class="inline text-indigo-400">
              <span class="text-4xl sm:text-6xl lg:text-7xl text-indigo-100">
                to a
                <span class="inline-flex relative">
                  <span
                    aria-hidden=""
                    class="
                      inline
                      absolute
                      inset-0
                      bg-yellow-500
                      transform
                      -rotate-1
                      scale-105
                    "
                  ></span>
                  <span class="relative px-2">Blog</span>
                </span>
                Within Minutes</span
              ></span
            >
          </span>
        </h1>
        <p
          class="
            mt-3
            px-12
            sm:px-0
            text-indigo-200
            sm:mt-5
            text-lg
            sm:text-2xl
            md:text-3xl
            sm:max-w-3xl
            sm:mx-auto
            md:mt-10
            lg:mx-0
          "
        >
          Create a portfolio website by turning Jupyter notebooks into beautiful
          blog posts. No coding required.
        </p>
      </div>
      <div class="mt-8 flex justify-center">
        <div class="inline-flex rounded-md shadow">
          <nuxt-link
            to="/register"
            class="
              w-full
              px-8
              py-3
              border border-transparent
              text-base
              font-bold
              rounded-md
              text-white
              bg-pink-600
              hover:bg-pink-700
              shadow
              border-none
              md:py-4
              md:text-xl
              md:px-10
            "
          >
            Start Blogging
          </nuxt-link>
        </div>
        <div class="ml-3 inline-flex">
          <nuxt-link
            to="/demo"
            class="
              w-full
              px-8
              py-3
              border border-transparent
              text-base
              font-bold
              rounded-md
              shadow
              text-indigo-700
              bg-indigo-100
              hover:bg-indigo-200
              md:py-4
              md:text-xl
              md:px-10
            "
          >
            See Demo
          </nuxt-link>
        </div>
      </div>
    </div>
    <app-preview v-if="false" />
    <process />
    <features />
    <section id="pricing" class="bg-gray-800 text-indigo-100">
      <div class="pt-12 sm:pt-16 lg:pt-24">
        <div class="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div class="max-w-3xl mx-auto space-y-2 lg:max-w-none">
            <h2
              class="
                text-3xl
                font-bold
                text-indigo-400
                sm:text-4xl
                lg:text-5xl
                my-4
              "
              data-aos="fade-up"
            >
              Simple Pricing
            </h2>
          </div>
          <h3
            class="text-xl sm:text-2xl text-indigo-200"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Start creating content for free. Upgrade for more features when
            ready!
          </h3>
        </div>
        <pricing
          class="my-8 sm:my-16"
          data-aos="fade-up"
          data-aos-delay="200"
        />
      </div>
    </section>
    <form-page data-aos="fade-up" data-aos-delay="200"
      ><sign-up-form />
      <h2
        class="
          mt-16
          text-indigo-100
          font-medium
          text-xl
          sm:text-2xl
          text-center
        "
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Have questions? Ask them
        <nuxt-link
          to="/contact"
          class="text-indigo-400 hover:text-indigo-500 italic"
          >here!</nuxt-link
        >
      </h2>
    </form-page>
  </div>
</template>

<script>
import Process from '@/components/partials/Process.vue'
import Pricing from '@/components/partials/Pricing.vue'
import AppPreview from '@/components/partials/AppPreview.vue'
import SignUpForm from '@/components/partials/SignUpForm'
import Features from '@/components/partials/Features.vue'
import FormPage from '@/components/FormPage'

export default {
  components: { Process, Pricing, AppPreview, Features, SignUpForm, FormPage },
  data() {
    return {
      videoModalOpen: false,
    }
  },
}
</script>
<style></style>;
