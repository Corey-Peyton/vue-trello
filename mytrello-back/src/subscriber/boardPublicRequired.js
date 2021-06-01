const HTTP = require("../config/HTTP");
const db = require("../loader/sequelize");

/**
 * Check if the board is public to access next data
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 * @param {Object} next Call nest midleware
 * @return {void} void
 */
async function boardPublicRequired(req, res, next) {
  try {
    const board = await db.board.findByPk(req.params.boardId);

    /* board not found */
    if (board === null)
      return { statusCode: HTTP.NotFound, data: "board not found" };

    if (!board.public) {
      return res.status(HTTP.Forbidden).send("The Board is not Public");
    }
    return next();
  } catch (err) {
    return res.status(HTTP.InternalServerError).send({ data: err });
  }
}

module.exports = boardPublicRequired;
