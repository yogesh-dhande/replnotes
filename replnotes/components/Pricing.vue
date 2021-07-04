<template>
  <div class="bg-gray-800">
    <div class="pt-12 sm:pt-16 lg:pt-24">
      <div class="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto space-y-2 lg:max-w-none">
          <p class="text-3xl font-bold text-white sm:text-3xl lg:text-4xl">
            Pricing
          </p>
        </div>
      </div>
    </div>
    <div class="mt-8 pb-12 bg-gray-200 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
      <div class="relative">
        <div class="absolute inset-0 h-3/4 bg-gray-800"></div>
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div class="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                <div>
                  <h3
                    class="
                      inline-flex
                      px-4
                      py-1
                      rounded-full
                      text-sm
                      font-semibold
                      tracking-wide
                      uppercase
                      bg-indigo-100
                      text-indigo-600
                    "
                    id="tier-standard"
                  >
                    Free
                  </h3>
                </div>
                <div class="mt-4 flex items-baseline text-6xl font-extrabold">
                  $0
                  <span class="ml-1 text-2xl font-medium text-gray-500"> </span>
                </div>
                <p class="mt-5 text-lg text-gray-500">
                  Start building your data science portfolio.
                </p>
              </div>
              <div
                class="
                  flex-1 flex flex-col
                  justify-between
                  px-6
                  pt-6
                  pb-8
                  bg-gray-50
                  space-y-6
                  sm:p-10
                  sm:pt-6
                "
              >
                <ul class="space-y-4">
                  <li
                    class="flex items-start"
                    v-for="feature in freeFeatures"
                    :key="feature"
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
                    <p class="ml-3 text-base text-gray-700">
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

            <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div class="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                <div>
                  <h3
                    class="
                      inline-flex
                      px-4
                      py-1
                      rounded-full
                      text-sm
                      font-semibold
                      tracking-wide
                      uppercase
                      bg-indigo-100
                      text-indigo-600
                    "
                    id="tier-standard"
                  >
                    Creator
                  </h3>
                </div>
                <div class="mt-4 flex items-baseline text-6xl font-extrabold">
                  $5/month
                  <span class="ml-1 text-2xl font-medium text-gray-500"> </span>
                </div>
                <p class="mt-5 text-lg text-gray-500">
                  There is currently no paid plan.
                </p>
              </div>
              <div
                class="
                  flex-1 flex flex-col
                  justify-between
                  px-6
                  pt-6
                  pb-8
                  bg-gray-50
                  space-y-6
                  sm:p-10
                  sm:pt-6
                "
              >
                <ul class="space-y-4">
                  <li
                    class="flex items-start"
                    v-for="feature in paidFeatures"
                    :key="feature"
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
                    <p class="ml-3 text-base text-gray-700">
                      {{ feature }}
                    </p>
                  </li>
                </ul>
                <div
                  class="
                    mt-8
                    sm:max-w-lg
                    sm:mx-auto
                    sm:text-center
                    lg:text-left
                    lg:mx-0
                  "
                >
                  <p class="mt-6 text-lg font-medium text-indigo-700">
                    Sign up to get notified when it’s ready.
                  </p>
                  <div class="mt-3">
                    <text-input
                      type="text"
                      v-model="email"
                      placeholder="Enter your email"
                      @focus="
                        emailErrors = [];
                        errors = [];
                      "
                      @blur="validateEmail"
                    />
                    <input-errors :errors="emailErrors"></input-errors>

                    <button
                      type="submit"
                      @click="notify"
                      class="
                        w-full
                        mt-3
                        inline-flex
                        justify-center
                        py-2
                        px-4
                        border border-transparent
                        shadow-sm
                        text-md
                        font-bold
                        rounded-md
                        text-white
                        hover:text-indigo-100
                        bg-gray-800
                        hover:bg-gray-900
                        focus:ring-4 focus:ring-gray-200
                        focus:bg-gray-900
                        disabled:opacity-50
                      "
                      :disabled="this.emailErrors.length > 0"
                    >
                      Notify Me
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/TextInput";
import InputErrors from "./InputErrors";

export default {
  name: "Pricing",
  components: {
    TextInput,
    InputErrors,
  },
  data() {
    return {
      email: "",
      emailErrors: [],
      freeFeatures: ["100 MB total storage", "10 MB size limit per post"],
      paidFeatures: [
        "1 GB total storage",
        "100 MB size limit per post",
        "Custom Domain",
        "Custom Styles and Integrations",
      ],
    };
  },
  methods: {
    validateEmail() {
      if (!this.email || this.email.length == 0) {
        this.emailErrors.push("Please enter an email.");
      } else if (!/^[0-9a-zA-Z_.-@]+$/.test(this.email)) {
        this.emailErrors.push("No spaces allowed in the email.");
      }
    },
    async notify() {
      let docRef = subscriberCollection.doc("paidPlan");
      let snap = await docRef.get();
      if (!snap.exists) {
        await docRef.set({
          emails: [this.email],
        });
      } else {
        await docRef.update({
          emails: this.$fireModule.firestore.FieldValue.arrayUnion(this.email),
        });
      }
      this.$router.push("/register");
    },
  },
};
</script>

<style>
</style>