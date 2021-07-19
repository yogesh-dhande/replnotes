const { formatBytes } = require("./utils");
const { join } = require("path");
const os = require("os");
const path = require("path");
const fs = require("fs");
const BusBoy = require("busboy");
const spawn = require("child-process-promise").spawn;
const { cors, getUIDFromRequest, getReadonly } = require("./utils");
const functions = require("firebase-functions");
const { db, bucket } = require("./app");

exports.calculateStorageUsed = async userId => {
  return await bucket.getFiles(
    { prefix: join("users", userId) },
    async (error, files) => {
      let readonly = { totalStorageUsed: 0 };

      if (error) {
        console.log(error);
      } else {
        files.forEach(async file => {
          readonly.totalStorageUsed += parseInt(file.metadata.size);
        });
      }
      await db.doc(`readonly/${userId}`).update(readonly);
    }
  );
};

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
    "Cache-Control": "public,max-age=3600"
  };

  await bucket.upload(localFilePath, {
    destination: destination,
    metadata: metadata
  });

  let url = await file.getSignedUrl({
    action: "read",
    expires: "03-01-2500"
  });

  return url[0];
}

exports.uploadPostFile = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      let uid = await getUIDFromRequest(req);

      const readonly = getReadonly(uid);
      if (readonly.totalStorageUsed > readonly.plan.storageLimit) {
        res.status(403).json({
          message: `Storage exceeded the limit of ${storageLimit}`
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
        let fileSizeLimit = readonly.plan.fileSizeLimit;
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
          "file.size": fs.statSync(fileToUpload.filepath).size
        };
        await postRef.update(patch);
        res.status(200).send("ok");
      });
      busboy.end(req.rawBody);

      return null;
    } catch (error) {
      res.status(400).json({ message: error.message });
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
            fileToUpload.thumnailFilepath
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
      res.status(400).json({ message: error.message });
      return null;
    }
  });
});
