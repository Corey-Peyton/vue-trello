const debug = require("debug")("service:cardlist");

const db = require("../../loader/sequelize");
const HTTP = require("../../config/HTTP");

async function createCardlist(boardId, { title }) {
  try {
    // Get the board
    const board = await db.board.findByPk(boardId);
    if (board === null)
      return { statusCode: HTTP.NoContent, data: "Board not found" };

    const cardlist = await board.createCardlist({ title });

    return { statusCode: HTTP.OK, data: cardlist };
  } catch (error) {
    debug("[createCardlist]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function deleteCardlist(cardlistId) {
  try {
    const cardlist = await db.cardlist.findByPk(cardlistId);
    if (cardlist === null)
      return { statusCode: HTTP.NotFound, data: "Cardlist Not Found" };

    await cardlist.destroy();
    return { statusCode: HTTP.OK, data: "Cardlist deleted" };
  } catch (error) {
    debug("[deleteCardlist]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function getAllCardlists(boardId) {
  try {
    const board = await db.board.findByPk(boardId);
    if (board === null)
      return { statusCode: HTTP.NoContent, data: "Board not found" };
    const cardlists = await board.getCardlists();

    return { statusCode: HTTP.OK, data: cardlists };
  } catch (error) {
    debug("[getAllCardlists]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function getCardlist(cardlistId) {
  try {
    const cardlist = await db.cardlist.findByPk(cardlistId);
    if (cardlist === null)
      return { statusCode: HTTP.NoContent, data: "Cardlist not found" };

    return { statusCode: HTTP.OK, data: cardlist };
  } catch (error) {
    debug("[getCardlist]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function getCardlistTitle(cardlistId) {
  try {
    const cardlist = await db.board.findByPk(cardlistId);
    if (cardlist === null)
      return { statusCode: HTTP.NoContent, data: "Cardlist not found" };

    return { statusCode: HTTP.OK, data: cardlist.title };
  } catch (error) {
    debug("[getCardlistTitle]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function updateCardlistTitle(cardlistId, title) {
  try {
    const cardlist = await db.board.findByPk(cardlistId);
    if (cardlist === null)
      return { statusCode: HTTP.NoContent, data: "Cardlist not found" };

    await cardlist.update({ title });

    return { statusCode: HTTP.OK, data: cardlist };
  } catch (error) {
    debug("[updateCardlistTitle]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

// async function getSomething() {
//   try {
//     return { statusCode: HTTP.OK, data: null };
//   } catch (error) {
//     debug("[getSomething]: ", error);
//     return {
//       statusCode: HTTP.InternalServerError,
//       data: { name: error.name, message: error.message },
//     };
//   }
// }

module.exports = {
  createCardlist,
  deleteCardlist,
  getAllCardlists,
  getCardlist,
  getCardlistTitle,
  updateCardlistTitle,
};
