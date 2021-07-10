<template>
  <modal :show="showFeedbackModal" @close="hideModal"> </modal>
</template>

<script>
import Modal from "@/../components/Modal";

export default {
  name: "feedback-modal",
  components: {
    Modal,
  },
  computed: {
    ...mapState(["showFeedbackModal"]),
  },
  methods: {
    hideModal() {
      this.$store.commit("showFeedbackModal", false);
    },
  },
};
</script>

<style>
</style>