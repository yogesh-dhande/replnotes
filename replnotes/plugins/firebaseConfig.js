const { join } = require("path");

export default async ({ app }, inject) => {
  inject("postsCollection", app.$fire.firestore.collection("posts"));
  inject("usersCollection", app.$fire.firestore.collection("users"));
  inject("readonlyCollection", app.$fire.firestore.collection("readonly"));
  inject("feedbackCollection", app.$fire.firestore.collection("feedback"));
  inject("sitesCollection", app.$fire.firestore.collection("sites"));

  const storageRef = app.$fire.storage.ref("users");
  inject("storageRef", storageRef);

  function uploadPostFile(formData, token) {
    let url = "/uploadPostFile";
    return app.$axios.post(url, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`
      }
    });
  }

  inject("uploadPostFile", uploadPostFile);

  async function uploadPostThumbnail(user, post) {
    let thumbnailSrc = post.thumbnail;
    try {
      let thumbnailPath = join(user.id, "posts", post.id, `thumbnail`);
      let ref = storageRef.child(thumbnailPath);

      await ref.putString(thumbnailSrc, "data_url", {
        customMetadata: {
          uid: user.id,
          name: user.name
        }
      });
      return await ref.getDownloadURL();
    } catch (error) {
      // If not valid data url
      return thumbnailSrc;
    }
  }

  inject("uploadPostThumbnail", uploadPostThumbnail);

  function updateUserPhoto(formData, token) {
    let url = `/updateUserPhoto`;
    return app.$axios.post(url, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`
      }
    });
  }

  inject("updateUserPhoto", updateUserPhoto);

  function upgradePlan(token) {
    return app.$axios.post(
      "/upgradePlan",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  inject("upgradePlan", upgradePlan);

  function addCustomDomain(customDomain, oldDomain, token) {
    return app.$axios.post(
      "/addCustomDomain",
      { customDomain, oldDomain },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  inject("addCustomDomain", addCustomDomain);

  function getCustomDomainStatus(customDomain, token) {
    return app.$axios.get(
      "/getCustomDomainStatus",
      { customDomain: customDomain },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  inject("getCustomDomainStatus", getCustomDomainStatus);
};
