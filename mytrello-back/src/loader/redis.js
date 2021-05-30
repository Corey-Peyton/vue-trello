const debug = require("debug")("express-microservice:redis");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);

const config = require("../config/redis");

/**
 * Load Redis configuration
 * @param {Object} app Express application
 */
function loader(app) {
  const client = redis.createClient({
    host: config.client.host,
    port: config.client.port,
  });
  if (config.client.password !== "") {
    client.auth(config.client.password, (err) => {
      if (err) {
        throw new Error(err);
      }
    });
  }
  app.use(
    session({
      ...config.store,
      store: new RedisStore({ client }),
    })
  );

  client.on("error", (err) => {
    debug("Redis error: ", err);
    throw new Error(err);
  });
}

module.exports = loader;
