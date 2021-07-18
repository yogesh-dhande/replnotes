export const state = () => ({
  authUserId: null,
  showFeedbackModal: false,
  token: null,
  currentUser: {},
  posts: [],
  site: {},
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
  },
  post(state) {
    return url => {
      const posts = state.posts.filter(post => post.url === url);
      return posts.length > 0 ? posts[0] : {};
    };
  },
  siteDomain(state) {
    return state.site && state.site.domain
      ? `https://${state.site.domain}`
      : null;
  },
  customDomain(state) {
    return state.site && state.site.customDomain
      ? `https://${state.site.customDomain}`
      : null;
  },
  isPaidAccount(state, getters) {
    return getters.loggedIn && state.readonly.plan !== "free";
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

        this.$postsCollection
          .where("user.id", "==", authUser.uid)
          .onSnapshot(querySnapshot => {
            const posts = [];
            querySnapshot.forEach(doc => {
              posts.push(doc.data());
            });
            commit("SET_POSTS", posts);
          });

        this.$sitesCollection
          .where("uid", "==", authUser.uid)
          .onSnapshot(querySnapshot => {
            if (querySnapshot.size > 0) {
              commit("SET_SITE", querySnapshot.docs[0].data());
            }
          });
      });
    }
  }
};

export const mutations = {
  SET_USER(state, val) {
    state.currentUser = val;
  },
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
  SET_SITE(state, site) {
    state.site = site;
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
