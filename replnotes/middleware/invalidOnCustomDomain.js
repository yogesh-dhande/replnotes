export default function({ store, error }) {
  // If using a custom domain
  if (store.state.siteOwner.name) {
    error({ statusCode: 404 });
  }
}
