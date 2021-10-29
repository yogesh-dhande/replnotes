export default function({ store, route, redirect }) {
  // If the user is not authenticated
  if (!store.getters.loggedIn) {
    return redirect(`/login?redirect=${route.path}`);
  }
}
