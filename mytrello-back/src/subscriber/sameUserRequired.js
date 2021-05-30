const HTTP = require("../config/HTTP");

/**
 * Check if client is the same as the one is trying to access
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 * @param {Object} next Call nest midleware
 * @return {void} void
 */
function sameUserRequired(req, res, next) {
  if (req.user.username !== req.params.username) {
    return res
      .status(HTTP.Forbidden)
      .send("You can only modify your own ressource");
  }
  return next();
}

module.exports = sameUserRequired;
