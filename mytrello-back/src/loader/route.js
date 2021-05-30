const userRouter = require("../route/user/userRoute");
const userSettingRouter = require("../route/user/userSettingRoute");

/**
 * Load all routes availbale on service
 * @param {Object} app Express application
 */
function loader(app) {
  app.use(`/users`, userRouter);
  app.use(`/users`, userSettingRouter);
}

module.exports = loader;
