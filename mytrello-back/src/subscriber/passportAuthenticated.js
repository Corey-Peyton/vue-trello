const HTTP = require("../config/HTTP");

/**
 * Check if client is authentificated
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 * @param {Object} next Call nest midleware
 * @return {void} void
 */
function passportAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return res
      .status(HTTP.Unauthorized)
      .send("401 - Unauthorized (Auth0 error)");
  }
  return next();
}

module.exports = passportAuthenticated;
