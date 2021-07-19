const { isEmpty } = require("./utils");
const { calculateStorageUsed } = require("./storage");
const functions = require("firebase-functions");
const { db, bucket } = require("./app");

exports.updateUserWhenNewPostCreated = functions.firestore
  .document("posts/{postId}")
  .onCreate(async (snap, context) => {
    let { postId } = context.params;
    let userId = snap.get("user.id");
    let data = snap.data();
    try {
      await db.doc(`users/${userId}`).update(`posts.${postId}`, {
        url: data.url,
        title: data.title,
        file: data.file,
        created: data.created,
        tags: data.tags,
        id: data.id
      });
      await calculateStorageUsed(userId);
      console.log(`Created post ${postId} for user ${userId}`);
    } catch (error) {
      console.log(`Error updating post ${postId} for user ${userId}: ${error}`);
    }
    return null;
  });

exports.updateUserWhenPostUpdated = functions.firestore
  .document("posts/{postId}")
  .onUpdate(async (change, context) => {
    let { postId } = context.params;
    let data = change.after.data();
    try {
      let snap = await db.doc(`posts/${postId}`).get();
      let userId = snap.get("user.id");
      let patch = {
        url: data.url,
        title: data.title,
        tags: data.tags
      };

      if (data.file) {
        patch.file = data.file;
      }
      await db.doc(`users/${userId}`).update(`posts.${postId}`, patch);
      await calculateStorageUsed(userId);
      console.log(`Updated post ${postId} for the user ${userId}`);
    } catch (error) {
      console.log(`Error updating post ${postId} for user ${userId}: ${error}`);
    }
    return null;
  });

exports.handlePostDeleted = functions.firestore
  .document("posts/{postId}")
  .onDelete(async (snap, context) => {
    let { postId } = context.params;
    let data = snap.data();
    let userId = data.user.id;
    try {
      await db
        .doc(`users/${userId}`)
        .update(`posts.${postId}`, admin.firestore.FieldValue.delete());

      await calculateStorageUsed(userId);

      let storageUrl = join("users", userId, "posts", postId);
      await bucket.deleteFiles({
        prefix: storageUrl
      });

      console.log(`Removed post ${postId} for user ${userId}`);
    } catch (error) {
      console.log(`Error removing post ${postId} for user ${userId}: ${error}`);
    }
    null;
  });

exports.updatePostsWhenUserUpdated = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    let { userId } = context.params;
    let data = change.after.data();
    let patch = {};
    try {
      if (data.displayName !== change.before.data().displayName) {
        patch["user.displayName"] = data.displayName;
      }
      if (data.thumbnailUrl !== change.before.data().thumbnailUrl) {
        patch["user.thumbnailUrl"] = data.thumbnailUrl;
      }
      if (!isEmpty(patch)) {
        let querySnapshot = await db
          .collection("posts")
          .where("user.id", "==", userId)
          .get();
        querySnapshot.forEach(doc => {
          db.doc(`posts/${doc.id}`).update(patch);
          console.log(`Updated post ${doc.id} for the user ${userId}`);
        });
      }
    } catch (error) {
      console.log(`Error updating posts for user ${userId}: ${error}`);
    }
    return null;
  });
