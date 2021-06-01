const HTTP = require("../config/HTTP");
const db = require("../loader/sequelize");

/**
 * Check if the cardlist is belonging to the board
 */
async function cardlistBelongingBoardRequired(req, res, next) {
  try {
    const board = await db.board.findByPk(req.params.boardId);
    const cardlist = await db.cardlist.findByPk(req.params.cardlistId);

    if (board === null)
      return { statusCode: HTTP.NotFound, data: "board not found" };

    if (cardlist === null)
      return { statusCode: HTTP.NotFound, data: "cardlist not found" };

    if (!(await board.hasCardlist(cardlist))) {
      return res
        .status(HTTP.Forbidden)
        .send("The cardlist is not belonging to the board");
    }
    return next();
  } catch (err) {
    return res.status(HTTP.InternalServerError).send({ data: err.message });
  }
}

module.exports = {
  cardlistBelongingBoardRequired,
};
