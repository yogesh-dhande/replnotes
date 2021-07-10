export default ({ app }, inject) => {
  const EventName = app.$fireModule.analytics.EventName

  const analyticsEvents = {
    ...EventName,
    VIEW_USER_POSTS: 'view_user_posts',
    VIEW_USER_HOME: 'view_user_home',
    VIEW_POST: 'view_post',
    CREATE_POST: 'create_post',
    EDIT_POST: 'edit_post',
  }

  inject('analyticsEvents', analyticsEvents)
}
