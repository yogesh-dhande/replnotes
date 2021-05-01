export const state = () => ({
    showFeedbackModal: false,
    token: null,
    currentUser: {},
    isEmailVerified: null,
    readonly: {},
    error: {
      response: {
        status: "404",
        data: {
          message: "Page Not Found",
        },
      },
    },
  })

export const getters = {
    userPostUrls(state) {
      if (!state.currentUser.posts) {
        return [];
      }
      return Object.values(state.currentUser.posts).map((post) => {
        return post.url;
      });
    },
    userTags(state) {
      if (!state.currentUser.posts) {
        return [];
      }
      let tagList = Object.values(state.currentUser.posts).map((post) => {
        return post.tags;
      });

      return [...new Set([].concat.apply([], tagList))];
    },
  }

export const actions = {

  async onAuthStateChangedAction(state, { authUser }) {

    if (!authUser) {
      // remove state
      state.commit('SET_USER', {})
      state.commit("SET_TOKEN", null);
      this.$router.push("/login");
    } else {
      authUser.getIdToken(/* forceRefresh */ true).then((token) => {
        this.$fire.analytics.setUserId(authUser.uid);
        state.commit("SET_TOKEN", token);
        state.commit("SET_EMAIL_VERIFIED", authUser.emailVerified);

        this.$usersCollection.doc(authUser.uid).onSnapshot((snap) => {
          state.commit("SET_USER", snap.data() || {});
        })
  
        this.$readonlyCollection
          .doc(authUser.uid)
          .onSnapshot((snap) => {
            state.commit("SET_READONLY_DATA", snap.data() || {});
          })
         
      })

    }
  },

  }

export const mutations = {
    SET_USER(state, val) {
      state.currentUser = val;
    },
    SET_AUTH_STATE(state, val) {
      state.auth.user = val
      state.auth.loggedIn = val ? true: false
    },
    SET_TOKEN(state, val) {
      state.token = val;
    },
    SET_EMAIL_VERIFIED(state, val) {
      state.isEmailVerified = val;
    },
    SET_READONLY_DATA(state, data) {
      state.readonly = data;
    },

  }