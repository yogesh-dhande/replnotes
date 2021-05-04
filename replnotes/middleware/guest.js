export default function ({ app }) {
    if (app.$fire.currentUser) {
      return redirect('/dashboard')
    }
  }