<template>
  <form-page>
    <div class="rounded-md bg-gray-800 p-4 my-auto text-indigo-200">
      <div class="flex flex-col items-center">
        <div class="flex-shrink-0 h-64 w-64 opacity-75">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="ml-3 text-4xl font-extrabold">
          <h1 v-if="error.statusCode === 404">Page not found</h1>
          <h1 v-else-if="error.message">{{ error.message }}</h1>
          <h1 v-else>An error occurred.</h1>
        </div>
      </div>
    </div>
  </form-page>
</template>

<script>
import FormPage from "@/components/FormPage";

export default {
  props: ["error"],
  components: {
    FormPage,
  },
  layout: ({ store }) => (store.state.siteOwner.name ? "custom" : "default"),
};
</script>