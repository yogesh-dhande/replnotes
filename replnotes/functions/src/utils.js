const { auth, db } = require("./app");
const { plans } = require("./plans");

exports.cors = require("cors")({
  origin: [
    "http://localhost:8080",
    "http://localhost:8081",
    "https://replnotes.com",
    "https://www.replnotes.com",
    "https://staging-2cacb.web.app"
  ]
});

exports.formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

exports.isEmpty = obj => {
  return (
    obj && // 👈 null and undefined check
    Object.keys(obj).length === 0 &&
    obj.constructor === Object
  );
};

exports.getUIDFromRequest = async req => {
  let decodedToken = await auth.verifyIdToken(
    req.get("authorization").replace("Bearer ", "")
  );
  return decodedToken.uid;
};

exports.getReadonly = async uid => {
  const doc = await db
    .collection("readonly")
    .doc(uid)
    .get();

  const readonly = doc.data();
  readonly.plan = plans[readonly.plan];
  return readonly;
};
