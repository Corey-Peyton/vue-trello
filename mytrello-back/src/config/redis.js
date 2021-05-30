/**
 * @constant
 * Configuration for connection to Redis-server
 */
const client = {
  host: process.env.REDIS_CLIENT_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_CLIENT_PORT) || 6379,
  password: process.env.REDIS_CLIENT_PASSWORD || "",
};

/**
 * @constant
 * Configuration for RedisStore
 */
const store = {
  secret: process.env.REDIS_STORE_SECRET || "MySuperSecret",
  resave: process.env.REDIS_STORE_RESAVE === "true" || false,
  saveUninitialized:
    process.env.REDIS_STORE_SAVEUNINITIALIZED === "true" || true,
  cookie: {
    domain: process.env.REDIS_COOKIE_DOMAIN || "localhost",
    secure: process.env.REDIS_STORE_COOKIE_SECURE === "true" || false,
    maxAge: Number(process.env.REDIS_STORE_COOKIE_MAXAGE) || 86400000,
  },
};

module.exports = {
  client,
  store,
};
