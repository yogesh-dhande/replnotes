<template>
  <div class="bg-gray-800">
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
            to="/admin/register"
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
          <a
            href="/#demo"
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
          </a>
        </div>
      </div>
    </div>
    <!-- Hero image -->
    <div class="relative">
      <div class="absolute inset-0 flex flex-col" aria-hidden="true">
        <div class="flex-1"></div>
        <div class="flex-1 w-full bg-gray-900"></div>
      </div>
      <div>
        <div
          class="relative flex justify-center items-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <img
            class="mx-auto rounded-lg"
            src="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
            width="1024"
            height="504"
            alt="Hero"
          />
          <a
            class="absolute group"
            @click.prevent.stop="videoModalOpen = true"
            href="#0"
            aria-controls="modal"
          >
            <svg
              class="
                w-16
                h-16
                sm:w-20
                sm:h-20
                hover:opacity-75
                transition
                duration-150
                ease-in-out
              "
              viewBox="0 0 88 88"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="78.169%"
                  y1="9.507%"
                  x2="24.434%"
                  y2="90.469%"
                  id="a"
                >
                  <stop stop-color="#EBF1F5" stop-opacity=".8" offset="0%" />
                  <stop stop-color="#EBF1F5" offset="100%" />
                </linearGradient>
              </defs>
              <circle fill="url(#a)" cx="44" cy="44" r="44" />
              <path
                class="fill-current text-purple-600"
                d="M52 44a.999.999 0 00-.427-.82l-10-7A1 1 0 0040 37V51a.999.999 0 001.573.82l10-7A.995.995 0 0052 44V44c0 .001 0 .001 0 0z"
              />
            </svg>
          </a>
        </div>

        <!-- Modal -->
        <Modal
          id="modal"
          ariaLabel="modal-headline"
          :show="videoModalOpen"
          @handleClose="videoModalOpen = false"
        >
          <iframe
            width="1424"
            height="595"
            src="https://www.youtube.com/embed/6Pvrk1Qt-B4"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Modal>
      </div>
    </div>
    <process />
    <pricing />
    <h2
      class="
        mb-12
        sm:mb-24
        text-indigo-100
        font-medium
        text-xl
        sm:text-2xl
        text-center
      "
    >
      Have questions? Ask them
      <nuxt-link
        to="/admin/feedback"
        class="text-indigo-400 hover:text-indigo-500 italic"
        >here!</nuxt-link
      >
    </h2>
  </div>
</template>

<script>
import Process from "@/../components/partials/Process.vue";
import Pricing from "@/../components/partials/Pricing.vue";
import Modal from "@/../components/layouts/Modal.vue";

export default {
  components: { Process, Pricing, Modal },
  data() {
    return {
      videoModalOpen: false,
    };
  },
};
</script>
<style></style>;
