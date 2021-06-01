const HTTP = require("../config/HTTP");
const db = require("../loader/sequelize");

/**
 * Check if the cardlist is belonging to the board
 */
async function cardlistBelongingBoardRequired(req, res, next) {
  try {
    const board = await db.board.findByPk(req.params.boardId);
    if (board === null)
      return { statusCode: HTTP.NotFound, data: "board not found" };

    const cardlist = await db.cardlist.findByPk(req.params.cardlistId);
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

/**
 * Check if the label is belonging to the board
 */
async function labelBelongingBoardRequired(req, res, next) {
  try {
    const board = await db.board.findByPk(req.params.boardId);
    if (board === null)
      return { statusCode: HTTP.NotFound, data: "board not found" };

    const label = await db.label.findByPk(req.params.labelId);
    if (label === null)
      return { statusCode: HTTP.NotFound, data: "label not found" };

    if (!(await board.hasLabel(label))) {
      return res
        .status(HTTP.Forbidden)
        .send("The label is not belonging to the board");
    }
    return next();
  } catch (err) {
    return res.status(HTTP.InternalServerError).send({ data: err.message });
  }
}

/**
 * Check if the card is belonging to the cardlist
 */
async function cardBelongingCardlistRequired(req, res, next) {
  try {
    const cardlist = await db.cardlist.findByPk(req.params.cardlistId);
    if (cardlist === null)
      return { statusCode: HTTP.NotFound, data: "cardlist not found" };

    const card = await db.card.findByPk(req.params.cardId);
    if (card === null)
      return { statusCode: HTTP.NotFound, data: "card not found" };

    if (!(await cardlist.hasCard(card))) {
      return res
        .status(HTTP.Forbidden)
        .send("The card is not belonging to the cardlist");
    }
    return next();
  } catch (err) {
    return res.status(HTTP.InternalServerError).send({ data: err.message });
  }
}

module.exports = {
  cardlistBelongingBoardRequired,
  labelBelongingBoardRequired,
  cardBelongingCardlistRequired,
};
