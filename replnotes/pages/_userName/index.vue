<template>
  <div v-if="user" class="px-2 lg:px-12 py-2 lg:py-12 bg-gray-800 min-h-screen">
    <window class="px-12 sm:mx-24">
      <template v-slot:top-right v-if="currentUser.id == user.id && !editMode">
        <icon-button @click="editMode = true">
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </icon-button>
      </template>
      <template v-slot:body>
        <about :user="user" :key="user.id" v-if="!editMode" />
        <profile
          class="max-w-xl"
          v-else
          @save="editMode = false"
          @cancel="editMode = false"
          :currentUser="user"
        />
      </template>
    </window>
  </div>
</template>

<script>
import About from "@/components/About";
import Profile from "@/components/Profile";
import Window from "@/components/Window";
import IconButton from "@/components/IconButton";
import { mapState } from "vuex";

export default {
  name: "user-home",
  components: {
    About,
    Profile,
    Window,
    IconButton,
  },
  middleware: "invalidOnCustomDomain",
  head() {
    let name = this.user ? this.user.displayName : this.userName;

    return this.$createSEOMeta({
      title: name,
      description: name + " @ REPL Notes",
      image: name,
    });
  },
  async asyncData(context) {
    let returnData = {
      userName: context.params.userName,
      user: null,
    };

    let querySnapshot = await context.app.$usersCollection
      .where("name", "==", returnData.userName)
      .get();

    if (querySnapshot.empty) {
      context.error({ statusCode: 404 });
      return;
    }
    returnData.user = querySnapshot.docs[0].data();
    return returnData;
  },
  data() {
    return {
      listeners: [],
      editMode: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>

<style>
</style>