const { cors } = require("./utils");
const functions = require("firebase-functions");

async function getAppRoutes(userName) {
  let routes = [];

  const usersRef = db.collection("users");

  let snapshot;
  if (!userName) {
    snapshot = await usersRef.get();
    snapshot.forEach(doc => {
      let user = doc.data();
      if (user.posts) {
        routes.push(`/${user.name}`);
        routes.push(`/${user.name}/posts`);
        Object.values(user.posts).map(post => {
          routes.push(`/${user.name}/posts/${post.url}`);
        });
      }
    });
  } else {
    snapshot = await usersRef.where("name", "==", userName).get();
    snapshot.forEach(doc => {
      let user = doc.data();
      if (user.posts) {
        Object.values(user.posts).map(post => {
          routes.push(`/posts/${post.url}`);
        });
      }
      if (user.tags) {
        tags.map(tag => {
          routes.push(`/tags/${tag}`);
        });
      }
    });
  }

  return routes;
}

exports.getRoutes = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      const userName = req.query.userName;
      return res.status(200).send(await getAppRoutes(userName));
    } catch (error) {
      console.log(error);
      return res.status(200).send([]);
    }
  });
});
