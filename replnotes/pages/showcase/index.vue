<template>
  <div>
    <div
      class="max-w-2xl md:max-w-4xl lg:max-w-5xl px-8 md:px-12 lg:px-24 mx-auto"
    >
      <h1
        class="text-center text-5xl sm:text-7xl tracking-tight font-extrabold my-6 text-gray-200"
      >
        Jupyter notebooks published as blogs
      </h1>
      <h2
        class="sm:text-center text-xl md:text-2xl sm:text-3xl font-normal text-gray-300 my-6"
      >
        <p>
          Check out these blogs made with
          <span class="text-indigo-400">REPL Notes</span> and discover the
          possibilities!
        </p>
      </h2>
    </div>

    <div class="my-3 max-w-lg mx-auto grid gap-0 xl:grid-cols-3 xl:max-w-none">
      <card
        v-for="post in posts"
        :key="post.id"
        class="shadow-lg bg-gray-900 bg-opacity-25 hover:bg-opacity-50"
      >
        <a v-if="post" :href="getPostUrl(post)" target="_blank">
          <div class="sm:px-0 flex flex-col cursor-pointer" role="link">
            <div class="flex-1 p-4 flex flex-col justify-between">
              <div class="flex-1 block mt-2">
                <p
                  class="text-xl my-2 font-bold tracking-tight text-indigo-200"
                >
                  {{ post.title }}
                </p>
                <p class="my-1 text-base text-indigo-100">
                  {{ post.description }}
                </p>
              </div>
              <img
                v-if="post.thumbnail"
                class="my-2 mx-auto max-w-3/4 bg-white opacity-80 rounded-md"
                :src="post.thumbnail"
                alt="Post preview thumbnail"
              />
            </div>
          </div>
        </a>
      </card>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const returnData = {
      posts: [],
      sites: {},
    };

    let snap = await context.app.$postsCollection
      .where("file.size", ">=", 50000)
      .orderBy("file.size", "desc")
      .limit(20)
      .get();

    if (!snap.empty) {
      returnData.posts = snap.docs.map((doc) => doc.data());
      //   get a list of user ids from all posts using the post.user.id key
      let userIds = returnData.posts.map((post) => post.user.id);
      //   get a list of unique user ids
      userIds = [...new Set(userIds)];
      //   get all sites that have a user id in the userIds list
      snap = await context.app.$sitesCollection
        .where("uid", "in", userIds)
        .get();
      // Map snap.docs to an object with the site id as the key
      // and the site data as the value
      if (!snap.empty) {
        returnData.sites = snap.docs.reduce((obj, doc) => {
          let data = doc.data();
          obj[data.uid] = data;
          return obj;
        }, {});
      }
    }

    return returnData;
  },
  methods: {
    getPostUrl(post) {
      let slug = post.url;
      let domain = this.sites[post.user.id]?.domain;
      return `https://${domain}/posts/${slug}`;
    },
  },
};
</script>

<style>
</style>