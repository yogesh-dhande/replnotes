<template>
  <form-page>
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
