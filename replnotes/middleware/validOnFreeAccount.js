export default function({ store, redirect }) {
  console.log(store.getters.isPaidAccount);
  if (store.getters.isPaidAccount) {
    return redirect(`/dashboard`);
  }
}
