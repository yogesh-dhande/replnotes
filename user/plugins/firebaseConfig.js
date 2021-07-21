export default ({ app }, inject) => {
  inject('postsCollection', app.$fire.firestore.collection('posts'))
  inject('usersCollection', app.$fire.firestore.collection('users'))
  inject('readonlyCollection', app.$fire.firestore.collection('readonly'))
  inject('feedbackCollection', app.$fire.firestore.collection('feedback'))
  inject('sitesCollection', app.$fire.firestore.collection('sites'))
}
