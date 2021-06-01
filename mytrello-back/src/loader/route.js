const userRouter = require("../route/user/userRoute");
const userSettingRouter = require("../route/user/userSettingRoute");

const boardRouter = require("../route/board/boardRoute");
const cardlistRouter = require("../route/cardlist/cardlistRoute");

/**
 * Load all routes availbale on service
 * @param {Object} app Express application
 */
function loader(app) {
  app.use(`/users`, userRouter);
  app.use(`/users`, userSettingRouter);
  app.use(``, boardRouter);
  app.use(``, cardlistRouter);
}

module.exports = loader;
