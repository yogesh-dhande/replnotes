export const state = () => ({
  authUserId: null,
  showFeedbackModal: false,
  token: null,
  currentUser: {},
  isEmailVerified: null,
  readonly: {}
});

export const getters = {
  userPostUrls(state) {
    if (!state.currentUser.posts) {
      return [];
    }
    return Object.values(state.currentUser.posts).map(post => {
      return post.url;
    });
  },
  userTags(state) {
    if (!state.currentUser.posts) {
      return [];
    }
    let tagList = Object.values(state.currentUser.posts).map(post => {
      return post.tags;
    });

    return [...new Set([].concat.apply([], tagList))];
  },
  loggedIn(state) {
    return state.authUserId;
  }
};

export const actions = {
  async onAuthStateChangedAction({ commit }, { authUser }) {
    commit("SET_AUTH_STATE", authUser ? authUser : {});

    if (!authUser) {
      // remove state
      commit("SET_USER", {});
      commit("SET_TOKEN", null);
    } else {
      authUser.getIdToken(/* forceRefresh */ true).then(token => {
        this.$fire.analytics.setUserId(authUser.uid);
        commit("SET_TOKEN", token);
        commit("SET_EMAIL_VERIFIED", authUser.emailVerified);

        this.$usersCollection.doc(authUser.uid).onSnapshot(snap => {
          commit("SET_USER", snap.data() || {});
        });

        this.$readonlyCollection.doc(authUser.uid).onSnapshot(snap => {
          commit("SET_READONLY_DATA", snap.data() || {});
        });
      });
    }
  }
};

export const mutations = {
  SET_USER(state, val) {
    state.currentUser = val;
  },
  SET_AUTH_STATE(state, authUser) {
    state.authUserId = authUser.uid;
  },
  SET_TOKEN(state, val) {
    state.token = val;
  },
  SET_EMAIL_VERIFIED(state, val) {
    state.isEmailVerified = val;
  },
  SET_READONLY_DATA(state, data) {
    state.readonly = data;
  }
};
