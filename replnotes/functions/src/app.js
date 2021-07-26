const admin = require("firebase-admin");
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);

const serviceAccount = !(
  process.env.FUNCTIONS_EMULATOR || adminConfig.projectId == "staging-2cacb"
)
  ? require("./../serviceKey.prod.json")
  : require("./../serviceKey.staging.json");

adminConfig.credential = admin.credential.cert(serviceAccount);
admin.initializeApp(adminConfig);

exports.adminConfig = adminConfig;
exports.db = admin.firestore();
exports.bucket = admin.storage().bucket();
exports.auth = admin.auth();
exports.admin = admin;
