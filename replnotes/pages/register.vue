<template>
  <form-page>
    <h1
      class="
        text-center text-6xl
        tracking-tight
        font-extrabold
        text-indigo-100
        mb-6
      "
    >
      Start Blogging
      <span class="block text-indigo-400 text-4xl">
        <span class="text-indigo-100">with</span>
        Jupyter notebooks</span
      >
    </h1>
    <sign-up-form />
  </form-page>
</template>

<script>
import FormPage from "@/components/FormPage";
import SignUpForm from "@/components/partials/SignUpForm";

export default {
  components: {
    FormPage,
    SignUpForm,
  },
  middleware: ["guest"],
  head() {
    return this.$createSEOMeta({
      title: "Join REPL Notes",
    });
  },
};
</script>
