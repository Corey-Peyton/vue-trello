const debug = require("debug")("express-microservice:passport");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const config = require("../config/passport");

/**
 * Load passport configuration
 * @param {Object} app Express application
 */
function loader(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      async (username, password, done) => {
        try {
          const user = await config.getUserByUsername(username);
          if (user === null) {
            return done(null, false, {
              message: "Wrong username",
            });
          }
          if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
          }
          return done(null, false, {
            message: "Wrong password",
          });
        } catch (err) {
          debug(err);
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await config.getUserById(id);
      if (user === null) {
        return done(null, false, {
          message: "User id doesn't exist",
        });
      }
      return done(null, user);
    } catch (err) {
      debug(err);
      return done(err);
    }
  });
}

module.exports = loader;
