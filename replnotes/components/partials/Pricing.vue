<template>
  <div class="text-indigo-100">
    <div class="flex justify-around mb-6 sm:mb-12">
      <div class="flex items-center text-lg sm:text-xl">
        <span id="monthly-billing-label" class="mr-3">
          <span class="font-medium">Monthly billing </span>
        </span>
        <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
        <button
          type="button"
          class="
            justify-self-center
            bg-gray-200
            relative
            inline-flex
            flex-shrink-0
            h-6
            w-11
            border-2 border-transparent
            rounded-full
            cursor-pointer
            transition-colors
            ease-in-out
            duration-200
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          "
          :class="{ 'bg-indigo-600': annual }"
          role="switch"
          aria-checked="false"
          aria-labelledby="annual-billing-label"
          @click="annual = !annual"
        >
          <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
          <span
            aria-hidden="true"
            class="
              translate-x-0
              pointer-events-none
              inline-block
              h-5
              w-5
              rounded-full
              bg-white
              shadow
              transform
              ring-0
              transition
              ease-in-out
              duration-200
            "
            :class="{ 'translate-x-5': annual }"
          ></span>
        </button>
        <span id="annual-billing-label" class="ml-3">
          <span class="font-medium">Annual billing </span>
          <span>(Save 50%)</span>
        </span>
      </div>
    </div>
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
            <button
              class="
                w-full
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
              @click="selectFree"
            >
              Select
            </button>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col bg-gray-900 rounded-lg shadow-lg overflow-hidden"
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
            <span v-if="!annual">
              $8
              <span class="text-2xl font-medium text-indigo-300">/month</span>
            </span>
            <span v-else>
              $48
              <span class="text-2xl font-medium text-indigo-300">/year</span>
            </span>
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
            <button
              class="
                w-full
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
              data-product="14054"
              aria-describedby="tier-standard"
              @click="selectPlan"
            >
              Start 1-month trial
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Pricing',
  data() {
    return {
      annual: true,
      allowFreeTrial: true,
      freeFeatures: [
        'Free subdomain at replnotes.com',
        'SEO-friendly server-rendered pages',
        'Social media previews with OG tags',
        '100 MB total storage',
      ],
      paidFeatures: [
        'All features in the free plan',
        'One custom domain',
        '1 GB total storage',
        'Custom CSS styles and Javascript integrations',
      ],
    }
  },
  computed: {
    ...mapState(['currentUser', 'token']),
    ...mapGetters(['loggedIn', 'isPaidAccount']),
  },
  methods: {
    selectFree() {
      this.$router.push('/register')
      this.$splitbee.track('Select Plan', {
        type: 'free',
      })
    },
    async selectPlan() {
      if (this.loggedIn && !this.isPaidAccount) {
        if (this.allowFreeTrial) {
          await this.successCallback()
          this.$splitbee.track('Select Plan', {
            type: 'trial',
          })
        } else {
          this.openCheckout()
        }
      } else {
        this.$router.push('/register')
      }
    },
    openCheckout() {
      console.log(process.env.NUXT_ENV_PADDLE_VENDOR_ID)
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-undef
        Paddle.Environment.set('sandbox')
      }
      // eslint-disable-next-line no-undef
      Paddle.Setup({ vendor: parseInt(process.env.NUXT_ENV_PADDLE_VENDOR_ID) })
      // eslint-disable-next-line no-undef
      Paddle.Checkout.open({
        product: this.annual
          ? process.env.NUXT_ENV_PADDLE_ANNUAL_PRODUCT_ID
          : process.env.NUXT_ENV_PADDLE_MONTHLY_PRODUCT_ID,
        email: this.currentUser.email,
        successCallback: this.successCallback,
      })
      this.$splitbee.track('Select Plan', {
        type: this.annual ? 'annual' : 'monthly',
      })
    },
    async successCallback() {
      await this.$upgradePlan(this.token)
      this.$router.push('/dashboard')
      this.$splitbee.track('Payment Successful')
    },
  },
}
</script>

<style>
</style>