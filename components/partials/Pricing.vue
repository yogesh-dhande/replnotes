<template>
  <section id="pricing" class="bg-gray-800 text-indigo-100">
    <div class="pt-12 sm:pt-16 lg:pt-24">
      <div class="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto space-y-2 lg:max-w-none">
          <p
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
          </p>
        </div>
        <p
          class="text-xl text-indigo-200"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Start creating content for free. Upgrade for more features when ready!
        </p>
      </div>
    </div>
    <div class="mt-8 pb-12 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
      <div
        class="
          max-w-md
          mx-auto
          space-y-4
          lg:max-w-5xl
          lg:grid lg:grid-cols-2
          lg:gap-5
          lg:space-y-0
        "
      >
        <div
          class="flex flex-col bg-gray-900 rounded-lg shadow-lg overflow-hidden"
          data-aos="fade-right"
          data-aos-delay="400"
        >
          <div class="px-6 py-8 sm:p-10 sm:pb-6">
            <div>
              <h3
                id="tier-standard"
                class="
                  inline-flex
                  px-4
                  py-1
                  rounded-full
                  text-sm
                  font-semibold
                  tracking-wide
                  uppercase
                  bg-indigo-600
                  text-indigo-100
                "
              >
                Free
              </h3>
            </div>
            <div class="mt-4 flex items-baseline text-6xl font-extrabold">
              $0
              <span class="ml-1 text-2xl font-medium text-indigo-300"> </span>
            </div>
            <p class="mt-5 text-lg text-indigo-300">
              Start sharing your work online.
            </p>
          </div>
          <div
            class="
              flex-1 flex flex-col
              justify-between
              px-6
              pt-6
              pb-8
              space-y-6
              sm:p-10
              sm:pt-6
            "
          >
            <ul class="space-y-4">
              <li
                v-for="feature in freeFeatures"
                :key="feature"
                class="flex items-start"
              >
                <div class="flex-shrink-0">
                  <!-- Heroicon name: outline/check -->
                  <svg
                    class="h-6 w-6 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p class="ml-3 text-base text-indigo-200">
                  {{ feature }}
                </p>
              </li>
            </ul>
            <div class="rounded-md shadow">
              <nuxt-link
                to="/register"
                class="
                  flex
                  items-center
                  justify-center
                  px-5
                  py-3
                  border border-transparent
                  text-base
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                "
                aria-describedby="tier-standard"
              >
                Get started
              </nuxt-link>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col bg-gray-900 rounded-lg shadow-lg overflow-hidden"
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <div class="px-6 py-8 sm:p-10 sm:pb-6">
            <div>
              <h3
                id="tier-standard"
                class="
                  inline-flex
                  px-4
                  py-1
                  rounded-full
                  text-sm
                  font-semibold
                  tracking-wide
                  uppercase
                  bg-indigo-600
                  text-indigo-100
                "
              >
                Premium
              </h3>
            </div>
            <div class="mt-4 flex items-baseline text-6xl font-extrabold">
              $8
              <span class="ml-1 text-2xl font-medium text-indigo-300"
                >/month</span
              >
            </div>
            <p class="mt-5 text-lg text-indigo-300">
              Build your data science portfolio.
            </p>
          </div>
          <div
            class="
              flex-1 flex flex-col
              justify-between
              px-6
              pt-6
              pb-8
              space-y-6
              sm:p-10
              sm:pt-6
            "
          >
            <ul class="space-y-4">
              <li
                v-for="feature in paidFeatures"
                :key="feature"
                class="flex items-start"
              >
                <div class="flex-shrink-0">
                  <!-- Heroicon name: outline/check -->
                  <svg
                    class="h-6 w-6 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p class="ml-3 text-base text-indigo-200">
                  {{ feature }}
                </p>
              </li>
            </ul>
            <div class="rounded-md shadow">
              <nuxt-link
                to="/register"
                class="
                  flex
                  items-center
                  justify-center
                  px-5
                  py-3
                  border border-transparent
                  text-base
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                "
                aria-describedby="tier-standard"
              >
                Get started
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Pricing',
  data() {
    return {
      email: '',
      emailErrors: [],
      freeFeatures: [
        'Free subdomain at replnotes.com',
        'SEO-friendly server-rendered pages',
        'Social media previews with OG tags',
        '100 MB total storage',
        '10 MB size limit per post',
      ],
      paidFeatures: [
        'All features in the free plan',
        'One custom domain',
        '1 GB total storage',
        '100 MB size limit per post',
        'Custom CSS styles and Javascript integrations',
      ],
    }
  },
}
</script>

<style>
</style>