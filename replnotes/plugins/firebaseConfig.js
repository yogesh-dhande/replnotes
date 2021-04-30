export default async ({ app }, inject) => {
    inject('postsCollection', app.$fire.firestore.collection("posts"))
    inject('usersCollection', app.$fire.firestore.collection("users"))
    inject('readonlyCollection', app.$fire.firestore.collection("readonly"))
    inject('feedbackCollection', app.$fire.firestore.collection("feedback"))

    const storageRef = app.$fire.storage.ref("users")
    inject('storageRef', storageRef)

    function uploadPostFile(formData, token) {
        let url = '/uploadPostFile';
        return app.$axios.post(url, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        });
      }

    inject('uploadPostFile', uploadPostFile)

    async function uploadPostThumbnail(user, post) {
        let thumbnailSrc = post.thumbnail;
        try {
          let thumbnailPath = join(user.id, "posts", post.id, `thumbnail`);
          let ref = storageRef.child(thumbnailPath);
      
          await ref.putString(thumbnailSrc, "data_url", {
            customMetadata: {
              uid: user.id,
              name: user.name,
            },
          });
          return await ref.getDownloadURL();
        } catch {
          // If not valid data url
          return thumbnailSrc;
        }
      }

      inject('uploadPostThumbnail', uploadPostThumbnail)

      function updateUserPhoto(formData, token) {
        let url = `/updateUserPhoto`;
        return app.$axios.post(url, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      inject('updateUserPhoto', updateUserPhoto)

      // const EventName = app.$fireModule.analytics.EventName;

      // const CustomEvents = {
      //   ...EventName,
      //   VIEW_USER_POSTS: "view_user_posts",
      //   VIEW_USER_HOME: "view_user_home",
      //   VIEW_POST: "view_post",
      //   CREATE_POST: "create_post",
      //   EDIT_POST: "edit_post",
      // }

      // inject('CustomEvents', CustomEvents)

  }