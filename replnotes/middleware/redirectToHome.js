export default function({ store, redirect }) {
  // If using a custom domain
  if (store.state.siteOwner.name) {
    redirect("/user");
  }
  redirect("/admin");
}
