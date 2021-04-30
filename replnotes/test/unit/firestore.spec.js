const firebase = require("@firebase/rules-unit-testing");
const fs = require("fs");
const http = require("http");

const PROJECT_ID = "staging-2cacb"
const COVERAGE_URL = `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}:ruleCoverage.html`;

const uid = "testuser";
const username = "testname";
const postId = "testPostId";
const validPost = {
  id: postId,
  url: "testUrl",
  title: "testTitle",
  created: firebase.firestore.FieldValue.serverTimestamp(),
  tags: ["testTag"],
  user: {
    id: uid,
    name: username,
  },
  file: {},
};

function getAuthedFirestore(auth) {
  return firebase
    .initializeTestApp({ projectId: PROJECT_ID, auth })
    .firestore();
}

async function getFiresoreWithPost(auth) {
  // Set up: user doc needs to exist first
  let db = await getAuthedFirestore(auth);

  await db
    .collection("users")
    .doc(uid)
    .set(validPost.user);

  await db
    .collection("posts")
    .doc(postId)
    .set(validPost);

  return db;
}

beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId: PROJECT_ID });
});

beforeAll(async () => {
  // Load the rules file before the tests begin
  const rules = fs.readFileSync("firestore.rules", "utf8");
  await firebase.loadFirestoreRules({ projectId: PROJECT_ID, rules });
});

afterAll(async () => {
  // Delete all the FirebaseApp instances created during testing
  // Note: this does not affect or clear any data
  await Promise.all(firebase.apps().map((app) => app.delete()));

  // Write the coverage report to a file
  const coverageFile = "firestore-coverage.html";
  const fstream = fs.createWriteStream(coverageFile);
  await new Promise((resolve, reject) => {
    http.get(COVERAGE_URL, (res) => {
      res.pipe(fstream, { end: true });

      res.on("end", resolve);
      res.on("error", reject);
    });
  });

  console.log(`View firestore rule coverage information at ${coverageFile}\n`);
});

test("anyone can read posts", async () => {
  let db = getAuthedFirestore();
  await firebase.assertSucceeds(
    db
      .collection("posts")
      .doc("anyDoc")
      .get()
  );
});

test("anyone can read users", async () => {
  let db = getAuthedFirestore();
  await firebase.assertSucceeds(
    db
      .collection("users")
      .doc("anyDoc")
      .get()
  );
});

test("only authenticated users can write to their own doc", async () => {
  let data = { key: "value" };

  await firebase.assertFails(
    getAuthedFirestore()
      .collection("users")
      .doc("testuser")
      .set(data)
  );
  await firebase.assertFails(
    getAuthedFirestore({ uid: "testuser" })
      .collection("users")
      .doc("testuser2")
      .set(data)
  );
  await firebase.assertSucceeds(
    getAuthedFirestore({ uid: "testuser" })
      .collection("users")
      .doc("testuser")
      .set(data)
  );
});

test("only authenticated users can create posts", async () => {
  let invalidPost = { key: "value" };

  await getAuthedFirestore({ uid: uid })
    .collection("users")
    .doc(uid)
    .set(validPost.user);

  await firebase.assertFails(
    getAuthedFirestore()
      .collection("posts")
      .doc(postId)
      .set(validPost)
  );

  await firebase.assertFails(
    getAuthedFirestore({ uid: uid })
      .collection("posts")
      .doc(postId)
      .set(invalidPost)
  );

  await firebase.assertSucceeds(
    getAuthedFirestore({ uid: uid })
      .collection("posts")
      .doc(postId)
      .set(validPost)
  );

  await firebase.assertSucceeds(
    getAuthedFirestore({ uid: uid, email_verified: true })
      .collection("posts")
      .doc(postId)
      .set(validPost)
  );
});

test("users can can only delete their own posts", async () => {
  let db = getFiresoreWithPost({ uid: uid, email_verified: true });

  await firebase.assertFails(
    getAuthedFirestore()
      .collection("posts")
      .doc(postId)
      .delete()
  );

  await firebase.assertFails(
    getAuthedFirestore({ uid: "testuser2", email_verified: true })
      .collection("posts")
      .doc(postId)
      .delete()
  );

  await firebase.assertSucceeds(
    getAuthedFirestore({ uid: uid })
      .collection("posts")
      .doc(postId)
      .delete()
  );
});
