const { signUp } = require("./src/auth");
const { getCustomDomainStatus, addCustomDomain } = require("./src/domains");
const { upgradePlan } = require("./src/plans");
const { getRoutes } = require("./src/routes");
const { uploadPostFile, updateUserPhoto } = require("./src/storage");
const {
  updateUserWhenNewPostCreated,
  updateUserWhenPostUpdated,
  handlePostDeleted,
  updatePostsWhenUserUpdated
} = require("./src/sync");

module.exports = {
  signUp,
  getCustomDomainStatus,
  addCustomDomain,
  upgradePlan,
  getRoutes,
  uploadPostFile,
  updateUserPhoto,
  updateUserWhenNewPostCreated,
  updateUserWhenPostUpdated,
  handlePostDeleted,
  updatePostsWhenUserUpdated
};
