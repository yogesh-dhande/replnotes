export default function({ store, redirect }) {
  if (store.getters.isPaidAccount) {
    console.log(store.getters.isPaidAccount);
    return redirect(`/dashboard`);
  }
}
