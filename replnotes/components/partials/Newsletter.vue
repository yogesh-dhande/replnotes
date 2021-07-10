<template>
  <section>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 pb-6 sm:pb-12">
      <!-- CTA box -->
      <div
        class="relative bg-gray-900 py-10 px-8 md:py-16 md:px-12 rounded-lg"
        data-aos="fade-up"
      >
        <div
          class="
            relative
            flex flex-col
            lg:flex-row
            justify-between
            items-center
          "
        >
          <!-- CTA content -->
          <div class="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left lg:w-1/2">
            <h3 class="font-bold text-3xl sm:text-5xl text-indigo-400 mb-2">
              Stay in the loop
            </h3>
            <p class="text-indigo-200 text-lg">
              Join our newsletter to get top news before anyone else.
            </p>
          </div>

          <!-- CTA form -->
          <form class="w-full lg:w-1/2">
            <div
              class="
                flex flex-col
                sm:flex-row
                space-x-0
                sm:space-x-2
                space-y-2
                sm:space-y-0
                justify-center
                max-w-xs
                mx-auto
                sm:max-w-md
                lg:max-w-none
              "
            >
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="
                  shadow-sm
                  focus:ring-gray-500
                  focus:border-gray-500
                  px-3
                  py-2
                  w-full
                  bg-gray-800
                  rounded-md
                "
                placeholder="example@gmail.com"
              />
              <button
                class="
                  px-3
                  py-2
                  rounded
                  font-bold
                  text-indigo-600
                  bg-indigo-200
                  hover:bg-indigo-100
                  shadow
                "
              >
                Subscribe
              </button>
            </div>
            <!-- Success message -->
            <!-- <p class="text-center lg:text-left lg:absolute mt-2 opacity-75 text-sm">Thanks for subscribing!</p> -->
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Newsletter",
};
</script>