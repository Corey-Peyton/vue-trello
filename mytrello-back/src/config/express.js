const config = {
  origin: process.env.EXPRESS_ORIGIN || "http://localhost:3000",
  port: process.env.EXPRESS_PORT || 4242,
  ssl: process.env.EXPRESS_SSL === "true" || false,
  json: {
    limit: "30mb",
  },
  credentials: {
    key: process.env.EXPRESS_CREDENTIALS_KEY || "credentials/server.key",
    cert: process.env.EXPRESS_CREDENTIALS_CERT || "credentials/server.cert",
  },
  defaultUserPassword: process.env.EXPRESS_DEFAULT_USER_PASSWORD || "password",
};

module.exports = config;
