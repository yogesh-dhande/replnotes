import "@firebase/analytics";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/functions";
import "@firebase/storage";
import * as axios from "axios";
import { join } from "path";
import { downloadFileFromUrl } from "~/services/notebook";

// firebase init goes here
const config = {
  apiKey: process.env.NUXT_ENV_FIREBASE_CONFIG_API_KEY,
  authDomain: process.env.NUXT_ENV_FIREBASE_CONFIG_AUTH_DOMAIN,
  storageBucket: process.env.NUXT_ENV_STORAGE_BUCKET,
  projectId: process.env.NUXT_ENV_FIREBASE_CONFIG_PROJECT_ID,
  measurementId: process.env.NUXT_ENV_MEASUREMENT_ID,
  appId: process.env.NUXT_ENV_ID,
};


// if (firebase.apps.length === 0) {
//   console.log(config)
//   firebase.initializeApp(config);
// }


// firebase utils
export const db = this.$fire.firestore();
export const auth = this.$fire.auth();
export const storage = this.$fire.storage();
// let analytics;

// if (process.client) {
//  analytics = firebase.analytics();
// }

// export default analytics

// let useEmulator = process.env.NUXT_ENV_USE_EMULATOR;

// if (useEmulator) {
//   auth.useEmulator("http://localhost:10000/");
//   firebase.functions().useEmulator("localhost", 10001);
//   db.useEmulator("localhost", 10002);
// }

// firebase collections
export const usersCollection = db.collection("users");
export const readonlyCollection = db.collection("readonly");
export const postsCollection = db.collection("posts");
export const subscriberCollection = db.collection("subscriptions");
export const feedbackCollection = db.collection("feedback");
export const storageRef = storage.ref("users");

export function uploadPostFile(formData, token) {
  let url = `${process.env.NUXT_ENV_FIREBASE_FUNCTIONS_URL}/uploadPostFile`;
  return axios.post(url, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function uploadPostThumbnail(user, post) {
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

export function updateUserPhoto(formData, token) {
  let url = `${process.env.NUXT_ENV_FIREBASE_FUNCTIONS_URL}/updateUserPhoto`;
  return axios.post(url, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function downloadNotebook(url, callback) {
  return downloadFileFromUrl(url, callback);
}

export const TimeStamp = firebase.firestore.FieldValue.serverTimestamp;
export const FieldValue = firebase.firestore.FieldValue;
export const EventName = firebase.analytics.EventName;

export const CustomEvents = {
  ...EventName,
  VIEW_USER_POSTS: "view_user_posts",
  VIEW_USER_HOME: "view_user_home",
  VIEW_POST: "view_post",
  CREATE_POST: "create_post",
  EDIT_POST: "edit_post",
};
