<template>
  <div class="bg-gray-800 text-indigo-100">
    <div
      class="
        max-w-5xl
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
      <div class="flex flex-col place-items-center px-2">
        <h1
          class="
            text-center text-5xl
            sm:text-7xl
            tracking-tight
            font-extrabold
            text-indigo-400
          "
        >
          Jupyter Notebooks
          <span class="block text-indigo-100">
            <span class="inline text-indigo-400">
              <span class="block text-4xl sm:text-6xl text-indigo-100">
                to a Blog Within Minutes</span
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
            text-md
            sm:text-xl
            md:text-2xl
            sm:max-w-2xl
            sm:mx-auto
            md:mt-5
            lg:mx-0
          "
        >
          Quickly create a portfolio by turning Jupyter notebooks into beautiful
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
              font-medium
              rounded-md
              text-white
              bg-gradient-to-r
              from-pink-600
              to-indigo-600
              hover:from-indigo-600
              hover:to-pink-600
              border-none
              md:py-4
              md:text-lg
              md:px-10
            "
          >
            Start a Blog
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
              font-medium
              rounded-md
              text-indigo-700
              bg-indigo-100
              hover:bg-indigo-200
              md:py-4
              md:text-lg
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
              Simple, Transparent Pricing
            </h2>
          </div>
          <h3
            class="text-xl text-indigo-200"
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
          to="/feedback"
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
