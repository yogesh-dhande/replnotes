<template>
  <div
    class="px-2 lg:px-12 py-2 lg:py-12 text-indigo-100 bg-gray-800 min-h-screen"
  >
    <div class="max-w-3xl mx-auto">
      <dl class="mx-12 mt-5 grid grid-cols-1 gap-5 lg:grid-cols-1">
        <div
          class="
            text-center text-indigo-300
            px-4
            py-5
            bg-gray-900 bg-opacity-50
            shadow
            rounded-lg
            overflow-hidden
            sm:p-6
          "
        >
          <dt class="text-md font-medium truncate text-indigo-300">Storage</dt>
          <dd class="mt-1 text-3xl text-indigo-300">
            <span class="font-base">{{ storageUsed.size }} </span
            ><span class="text-2xl">{{ storageUsed.units }}</span>
            /
            <span class="font-bold text-indigo-500">100 </span>
            <span class="text-2xl font-bold text-indigo-500">MB</span>
          </dd>
        </div>
        <div class="flex flex-col">
          <div v-if="!editProfile">
            <button
              class="
                flex flex-row
                w-full
                py-6
                justify-center
                items-center
                text-indigo-300
                font-bold
                text-lg
                bg-gray-900 bg-opacity-50
                rounded-lg
                hover:bg-opacity-100
                mouse
                shadow
                transition
                ease-in
                duration-200
                focus:outline-none
              "
              @click="editProfile = true"
            >
              <div>
                <svg
                  class="h-8 w-8 mx-auto p-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <div class="ml-3">Edit Your Profile</div>
            </button>
          </div>

          <div v-else>
            <profile
              @cancel="editProfile = false"
              :currentUser="currentUser"
            ></profile>
          </div>
        </div>
        <div class="flex flex-col">
          <div v-if="!editSiteSettings">
            <button
              class="
                flex flex-row
                w-full
                py-6
                justify-center
                items-center
                text-indigo-300
                font-bold
                text-lg
                bg-gray-900 bg-opacity-50
                rounded-lg
                hover:bg-opacity-100
                mouse
                shadow
                transition
                ease-in
                duration-200
                focus:outline-none
              "
              @click="editSiteSettings = true"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 mx-auto p-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>

              <div class="ml-3">Edit Site Settings</div>
            </button>
          </div>

          <div v-else>
            <site-settings
              @cancel="editSiteSettings = false"
              :user="currentUser"
            ></site-settings>
          </div>
        </div>
        <div
          class="
            px-4
            py-5
            bg-gray-900 bg-opacity-50
            shadow
            rounded-lg
            overflow-hidden
            sm:p-6
          "
        >
          <div
            class="text-center text-2xl font-medium text-indigo-300 truncate"
          >
            <h2>
              {{ this.posts.length }}
              <span v-if="this.posts.length === 1">Post</span
              ><span v-else>Posts</span>
            </h2>
          </div>

          <div class="flex flex-col my-3 mx-6">
            <div v-if="!editPosts">
              <button
                class="
                  flex flex-row
                  w-full
                  py-2
                  justify-center
                  items-center
                  text-indigo-100
                  font-bold
                  bg-indigo-600
                  hover:bg-indigo-700
                  rounded-lg
                  hover:bg-opacity-100
                  mouse
                  shadow
                  transition
                  ease-in
                  duration-200
                  focus:outline-none
                "
                @click="editPosts = true"
              >
                <div>
                  <svg
                    class="h-8 w-8 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>

                <div class="ml-3">Add a New Post</div>
              </button>
            </div>

            <div v-else>
              <create-post @cancel="editPosts = false"></create-post>
            </div>
          </div>
          <post-list-item
            class="mt-6"
            :post="post"
            v-for="post in orderedPosts"
            :key="post.id"
          >
            <div class="text-left px-3 py-8 rounded">
              <h2>{{ post.title }}</h2>
              <h3 class="text-sm text-indigo-300">
                URL: {{ `/posts/${post.url}` }}
              </h3>
            </div>
          </post-list-item>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
import CreatePost from "@/../components/CreatePost";
import Profile from "@/../components/Profile";
import { mapState } from "vuex";
import SiteSettings from "@/../components/SiteSettings.vue";

export default {
  name: "dashboard",
  components: {
    "create-post": CreatePost,
    Profile,
    SiteSettings,
  },
  middleware: ["invalidOnCustomDomain", "auth"],
  head() {
    return this.$createSEOMeta({
      title: "Dashboard. REPL Notes",
      noIndex: true,
    });
  },
  data() {
    return {
      posts: [],
      listeners: [],
      editPosts: false,
      editProfile: false,
      editSiteSettings: false,
    };
  },
  computed: {
    ...mapState(["currentUser", "readonly"]),
    orderedPosts() {
      // most recent first
      return this.posts
        .filter((post) => post.created)
        .slice()
        .sort((a, b) => b.created.seconds - a.created.seconds);
    },
    storageUsed() {
      if (this.readonly) {
        return this.formatBytes(this.readonly.totalStorageUsed, 1);
      }
      return this.formatBytes(0, 1);
    },
  },
  mounted() {
    this.attachListerners();
  },
  watch: {
    currentUser() {
      this.detachListeners();
      this.attachListerners();
    },
  },
  methods: {
    attachListerners() {
      if (this.currentUser.id) {
        let listener = this.$postsCollection
          .where("user.id", "==", this.currentUser.id)
          .onSnapshot((querySnapshot) => {
            this.posts = [];
            querySnapshot.forEach((doc) => {
              this.posts.push(doc.data());
            });
          });
        this.listeners.push(listener);
      }
    },
    detachListeners() {
      if (this.listeners) {
        this.listeners.forEach((listener) => listener());
      }
    },
    formatBytes(bytes, decimals = 2) {
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      if (bytes === 0)
        return {
          size: 0,
          units: sizes[0],
        };

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return {
        size: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
        units: sizes[i],
      };
    },
  },
  beforeDestroy() {
    this.detachListeners();
  },
};
</script>

<style>
</style>