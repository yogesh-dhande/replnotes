const axios = require("axios");
const { cors, getUIDFromRequest, getReadonly } = require("./utils");
const functions = require("firebase-functions");
const { db } = require("./app");

exports.addVirtualHost = async (
  siteId,
  incomingAddress,
  oldDomain = null,
  isCustomDomain = false
) => {
  const patch = {};

  let userSiteUrl = null;
  if (process.env.FUNCTIONS_EMULATOR) {
    userSiteUrl = null;
  } else if (adminConfig.projectId == "staging-2cacb") {
    userSiteUrl = "user-replnotes.web.app";
  } else if (adminConfig.projectId == "nbtoblog-8a03f") {
    userSiteUrl = "user-replnotes-production.web.app";
  }

  if (userSiteUrl) {
    if (isCustomDomain) {
      patch["customDomain"] = incomingAddress;
    } else {
      patch["domain"] = incomingAddress;
    }
    await axios.post(
      "https://cloud.approximated.app/api/vhosts",
      {
        incoming_address: incomingAddress,
        target_address: USER_SITE_URL,
        target_ports: "443"
      },
      {
        headers: {
          "api-key": functions.config().app.approximated_api_key
        }
      }
    );

    if (oldDomain) {
      await axios.delete(
        "https://cloud.approximated.app/api/vhosts",
        {
          incoming_address: oldDomain
        },
        {
          headers: {
            "api-key": functions.config().app.approximated_api_key
          }
        }
      );
    }
  } else {
    patch["domain"] = "localhost:8081";
  }
  return await db
    .collection("sites")
    .doc(siteId)
    .update(patch);
};

exports.getCustomDomainStatus = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      const status = await axios.get(
        "https://cloud.approximated.app/api/vhosts/by/incoming",
        {
          incoming_address: req.query.customDomain
        },
        {
          headers: {
            "api-key": functions.config().app.approximated_api_key
          }
        }
      );
      res.status(200).send(status.data);
    } catch (error) {
      console.log(error.message);
      res.status(error.response.status).json({ message: error.message });
    }
  });
});

exports.addCustomDomain = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      const uid = await getUIDFromRequest(req);
      const readonly = getReadonly(uid);
      if (readonly.plan.customDomain) {
        await addVirtualHost(
          uid,
          req.body.customDomain,
          req.body.oldDomain,
          isCustomDomain
        );
        return res.status(200).send(req.body);
      } else {
        res.status(403).json({
          message: "Custom domains are only available on the paid plan"
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  });
});
