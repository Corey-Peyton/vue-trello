const debug = require("debug")("service:board");

const db = require("../../loader/sequelize");
const HTTP = require("../../config/HTTP");

async function getAllPublicBoard() {
  try {
    const boards = await db.board.findAll({
      where: { public: true },
    });

    return { statusCode: HTTP.OK, data: boards };
  } catch (error) {
    debug("[getAllPublicBoard]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function getAllUserBoards(username) {
  try {
    const user = await db.user.findOne({
      where: { username },
    });
    if (user === null)
      return { statusCode: HTTP.NoContent, data: "User not found" };

    const boards = await user.getBoards();

    return { statusCode: HTTP.OK, data: boards };
  } catch (error) {
    debug("[getAllUserBoards]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function createBoard(username, board) {
  try {
    // Get the user
    const user = await db.user.findOne({
      where: { username },
    });
    if (user === null)
      return { statusCode: HTTP.NoContent, data: "User not found" };

    const boardCreated = await db.board.create({ ...board });
    if (boardCreated === null)
      return { statusCode: HTTP.BadRequest, data: "Failed to create board" };
    boardCreated.addMember(user);
    boardCreated.setAuthor(user);
    // TODO CREATE DEFAULT LABELS FOR BOARDS

    return { statusCode: HTTP.OK, data: boardCreated };
  } catch (error) {
    debug("[createBoard]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function deleteBoard(board_id) {
  try {
    const boardToDelete = await db.findByPk(board_id);
    if (boardToDelete === null)
      return { statusCode: HTTP.NotFound, data: "Board Not Found" };

    await boardToDelete.destroy();
    return { statusCode: HTTP.OK, data: "Board deleted" };
  } catch (error) {
    debug("[deleteBoard]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function getBoard(board_id) {
  try {
    const board = await db.findByPk(board_id);
    if (board === null)
      return { statusCode: HTTP.NotFound, data: "Board Not Found" };

    return { statusCode: HTTP.OK, data: board };
  } catch (error) {
    debug("[getBoard]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function getBoardTitle(board_id) {
  try {
    const board = await db.findByPk(board_id);
    if (board === null)
      return { statusCode: HTTP.NotFound, data: "Board Not Found" };

    return { statusCode: HTTP.OK, data: board.title };
  } catch (error) {
    debug("[getBoardTitle]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function updateBoardTitle(board_id, title) {
  try {
    const board = await db.findByPk(board_id);
    if (board === null)
      return { statusCode: HTTP.NotFound, data: "Board Not Found" };

    await board.update({ title });
    return { statusCode: HTTP.OK, data: board };
  } catch (error) {
    debug("[updateBoardTitle]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function isBoardPublic(board_id) {
  try {
    const board = await db.findByPk(board_id);
    if (board === null)
      return { statusCode: HTTP.NotFound, data: "Board Not Found" };

    return { statusCode: HTTP.OK, data: board.public };
  } catch (error) {
    debug("[isBoardPublic]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function updateBoardPublic(board_id, is_public) {
  try {
    const board = await db.findByPk(board_id);
    if (board === null)
      return { statusCode: HTTP.NotFound, data: "Board Not Found" };

    await board.update({ public: is_public });
    return { statusCode: HTTP.OK, data: board };
  } catch (error) {
    debug("[updateBoardPublic]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function getBoardAuthor(board_id) {
  try {
    const board = await db.findByPk(board_id);
    if (board === null)
      return { statusCode: HTTP.NotFound, data: "Board Not Found" };

    return { statusCode: HTTP.OK, data: board.getAuthor() };
  } catch (error) {
    debug("[getBoardAuthor]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

module.exports = {
  getAllPublicBoard,
  getAllUserBoards,
  createBoard,
  deleteBoard,
  getBoard,
  getBoardTitle,
  updateBoardTitle,
  isBoardPublic,
  updateBoardPublic,
  getBoardAuthor,
};
