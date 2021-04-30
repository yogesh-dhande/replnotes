const { join } = require("path");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const os = require("os");
const path = require("path");
const fs = require("fs");
const BusBoy = require("busboy");
const spawn = require("child-process-promise").spawn;
const { reservedNames } = require("./validation");

const cors = require("cors")({ origin: true });

const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);

const serviceAccount = !(
  process.env.FUNCTIONS_EMULATOR || adminConfig.projectId == "staging-2cacb"
)
  ? require("./serviceKey.prod.json")
  : require("./serviceKey.staging.json");

adminConfig.credential = admin.credential.cert(serviceAccount);
admin.initializeApp(adminConfig);

const db = admin.firestore();
const bucket = admin.storage().bucket();

const plans = {
  free: {
    storageLimit: 100 * 1024 * 1024, // MB
    fileSizeLimit: 10 * 1024 * 1024,
  },
  paid: {
    storageLimit: 1024, // MB,
    fileSizeLimit: 100 * 1024 * 1024,
  },
};

const calculateStorageUsed = async function(userId) {
  return await bucket.getFiles(
    { prefix: join("users", userId) },
    async (error, files) => {
      let readonly = { totalStorageUsed: 0 };

      if (error) {
        console.log(error);
      } else {
        files.forEach(async (file) => {
          readonly.totalStorageUsed += parseInt(file.metadata.size);
        });
      }
      await db.doc(`readonly/${userId}`).update(readonly);
    }
  );
};

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function isEmpty(obj) {
  return (
    obj && // 👈 null and undefined check
    Object.keys(obj).length === 0 &&
    obj.constructor === Object
  );
}

exports.signUp = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation,
      };

      if (newUser.password !== newUser.passwordConfirmation) {
        return res.status(403).json({ message: "Passwords do not match" });
      }
      if (reservedNames.includes(newUser.name)) {
        return res.status(403).json({
          message: `Username ${newUser.name} not allowed. Please pick a different name.`,
        });
      }
      let snap = await db
        .collection("users")
        .where("name", "==", newUser.name)
        .get();
      if (snap.size > 0) {
        console.log("username already taken");

        return res
          .status(403)
          .json({ message: `Username ${newUser.name} is already taken.` });
      } else {
        console.log("creating user");
        let user = await admin.auth().createUser({
          email: newUser.email,
          password: newUser.password,
          emailVerified: false,
        });

        let userDoc = {
          name: newUser.name,
          id: user.uid,
          email: user.email,
          displayName: newUser.name,
          created: admin.firestore.FieldValue.serverTimestamp(),
          photoUrl: "",
          thumbnailUrl: "",
          title: "",
          location: "",
          social: {
            github: {
              label: "Github",
              url: "",
            },
            linkedIn: {
              label: "LinkedIn",
              url: "",
            },
            twitter: {
              label: "Twitter",
              url: "",
            },
            youtube: {
              label: "Youtube",
              url: "",
            },
          },
          aboutMe: "",
        };
        await db
          .collection("users")
          .doc(user.uid)
          .set(userDoc);
        await db
          .collection("readonly")
          .doc(user.uid)
          .set({
            id: user.uid,
            totalStorageUsed: 0,
            plan: "free",
          });
        return res.status(200).send(newUser);
      }
    } catch (error) {
      res.status(400).json(error);
    }
  });
});

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
        id: data.id,
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
        tags: data.tags,
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
        prefix: storageUrl,
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
        querySnapshot.forEach((doc) => {
          db.doc(`posts/${doc.id}`).update(patch);
          console.log(`Updated post ${doc.id} for the user ${userId}`);
        });
      }
    } catch (error) {
      console.log(`Error updating posts for user ${userId}: ${error}`);
    }
    return null;
  });

async function getUIDFromRequest(req) {
  let decodedToken = await admin
    .auth()
    .verifyIdToken(req.get("authorization").replace("Bearer ", ""));
  return decodedToken.uid;
}

function getTempFilepath(extension) {
  return path.join(
    os.tmpdir(),
    `${Math.round(Math.random() * 1000000000000).toString()}.${extension}`
  );
}

async function uploadFileToStorage(destination, localFilePath, mimetype) {
  let file = bucket.file(destination);
  const metadata = {
    contentType: mimetype,
    // To enable Client-side caching you can set the Cache-Control headers here. Uncomment below.
    "Cache-Control": "public,max-age=3600",
  };

  await bucket.upload(localFilePath, {
    destination: destination,
    metadata: metadata,
  });

  let url = await file.getSignedUrl({
    action: "read",
    expires: "03-01-2500",
  });

  return url[0];
}

exports.uploadPostFile = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      let uid = await getUIDFromRequest(req);
      let doc = await db
        .collection("readonly")
        .doc(uid)
        .get();

      let readonly = doc.data();
      if (readonly.totalStorageUsed > plans[readonly.plan].storageLimit) {
        res.status(403).json({
          message: `Storage exceeded the limit of ${
            plans[readonly.plan].storageLimit
          }`,
        });
        return null;
      }
      const busboy = new BusBoy({ headers: req.headers });
      let fileToUpload = {};
      let fields = {};
      busboy.on("field", (field, val) => {
        fields[field] = JSON.parse(val);
      });
      busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
        const extension = filename.split(".")[filename.split(".").length - 1];
        const filepath = getTempFilepath(extension);
        fileToUpload = { filename, filepath, mimetype, extension };
        file.pipe(fs.createWriteStream(filepath));
      });
      busboy.on("finish", async () => {
        let fileSizeLimit = plans[readonly.plan].fileSizeLimit;
        if (fs.statSync(fileToUpload.filepath).size > fileSizeLimit) {
          let message = `Files larger than ${formatBytes(
            fileSizeLimit
          )} are not allowed. Please upgrade your plan to upload larger files.`;
          console.log(message);
          res.status(403).json({ message: message });
          return null;
        }
        let postRef = db.collection("posts").doc(fields.post.id);
        let destination = join(
          "users",
          uid,
          "posts",
          postRef.id,
          `post.${fileToUpload.extension}`
        );

        let url = await uploadFileToStorage(
          destination,
          fileToUpload.filepath,
          fileToUpload.mimetype
        );

        let patch = {
          "file.url": url,
          "file.size": fs.statSync(fileToUpload.filepath).size,
        };
        await postRef.update(patch);
        res.status(200).send("ok");
      });
      busboy.end(req.rawBody);

      return null;
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
      return null;
    }
  });
});

exports.updateUserPhoto = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      let uid = await getUIDFromRequest(req);
      const busboy = new BusBoy({ headers: req.headers });
      let fileToUpload = {};
      let fields = {};
      busboy.on("field", (field, val) => {
        fields[field] = JSON.parse(val);
      });
      busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
        const extension = filename.split(".")[filename.split(".").length - 1];
        // 32756238461724837.ipynb
        const filepath = getTempFilepath(extension);
        const thumnailFilepath = getTempFilepath(extension);
        fileToUpload = { filename, filepath, thumnailFilepath, mimetype };
        file.pipe(fs.createWriteStream(filepath));
      });
      busboy.on("finish", async () => {
        const THUMB_MAX_HEIGHT = 200;
        const THUMB_MAX_WIDTH = 200;

        let userPhotoPath = join("users", uid, "userPhoto");
        let userThumbnailPath = join("users", uid, "userThumbnail");

        await spawn(
          "convert",
          [
            fileToUpload.filepath,
            "-thumbnail",
            `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`,
            fileToUpload.thumnailFilepath,
          ],
          { capture: ["stdout", "stderr"] }
        );

        let photoUrl = await uploadFileToStorage(
          userPhotoPath,
          fileToUpload.filepath,
          fileToUpload.mimetype
        );

        let thumbnailUrl = await uploadFileToStorage(
          userThumbnailPath,
          fileToUpload.thumnailFilepath,
          fileToUpload.mimetype
        );

        fs.unlinkSync(fileToUpload.filepath);
        fs.unlinkSync(fileToUpload.thumnailFilepath);

        await db
          .collection("users")
          .doc(fields.user.id)
          .update({ photoUrl: photoUrl, thumbnailUrl: thumbnailUrl });

        await calculateStorageUsed(uid);
      });
      busboy.end(req.rawBody);

      res.status(200).send("ok");
      return null;
    } catch (error) {
      res.status(400).json(error);
      return null;
    }
  });
});

