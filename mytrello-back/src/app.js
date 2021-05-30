const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const flash = require("connect-flash");
const helmet = require("helmet");

const expressSettings = require("./config/express");

const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: expressSettings.json.limit }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/../public")));
app.use(flash());
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", expressSettings.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

require("./loader/redis")(app);
require("./loader/passport")(app);
require("./loader/route")(app);

module.exports = app;
