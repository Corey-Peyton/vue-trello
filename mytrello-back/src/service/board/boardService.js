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

async function createBoard(username, newBoard) {
  try {
    // Get the user
    const user = await db.user.findOne({
      where: { username },
    });
    if (user === null)
      return { statusCode: HTTP.NoContent, data: "User not found" };

    const board = await db.board.create({
      title: newBoard.title,
      public: newBoard.public,
    });
    if (board === null)
      return { statusCode: HTTP.BadRequest, data: "Failed to create board" };
    board.addMember(user);
    board.setAuthor(user);

    // Create Default Labels
    await board.createLabel({ color: "#51e898" });
    await board.createLabel({ color: "#f2d600" });
    await board.createLabel({ color: "#ff9f1a" });
    await board.createLabel({ color: "#eb5a46" });
    await board.createLabel({ color: "#0079bf" });

    return { statusCode: HTTP.OK, data: board };
  } catch (error) {
    debug("[createBoard]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function deleteBoard(boardId) {
  try {
    const boardToDelete = await db.board.findByPk(boardId);
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
async function getBoard(boardId) {
  try {
    const board = await db.board.findByPk(boardId, {
      attributes: { exclude: ["authorId"] },
      include: [
        { model: db.user, as: "author", attributes: { exclude: ["password"] } },
        {
          model: db.user,
          as: "members",
          attributes: { exclude: ["password"] },
        },
        db.cardlist,
        db.label,
      ],
    });
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
async function getBoardTitle(boardId) {
  try {
    const board = await db.board.findByPk(boardId);
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
async function updateBoardTitle(boardId, title) {
  try {
    const board = await db.board.findByPk(boardId);
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
async function isBoardPublic(boardId) {
  try {
    const board = await db.board.findByPk(boardId);
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
async function updateBoardPublic(boardId, isPublic) {
  try {
    const board = await db.board.findByPk(boardId);
    if (board === null)
      return { statusCode: HTTP.NotFound, data: "Board Not Found" };

    await board.update({ public: isPublic });
    return { statusCode: HTTP.OK, data: board };
  } catch (error) {
    debug("[updateBoardPublic]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function getBoardAuthor(boardId) {
  try {
    const board = await db.board.findByPk(boardId);
    if (board === null)
      return { statusCode: HTTP.NotFound, data: "Board Not Found" };

    return { statusCode: HTTP.OK, data: await board.getAuthor() };
  } catch (error) {
    debug("[getBoardAuthor]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function getBoardMembers(boardId) {
  try {
    const board = await db.board.findByPk(boardId);
    if (board === null)
      return { statusCode: HTTP.NotFound, data: "Board Not Found" };

    const members = await board.getMembers({
      attributes: { exclude: ["password"] },
    });
    return { statusCode: HTTP.OK, data: members };
  } catch (error) {
    debug("[getBoardMembers]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function addBoardMember(boardId, username) {
  try {
    const board = await db.board.findByPk(boardId);
    if (board === null)
      return { statusCode: HTTP.NotFound, data: "Board Not Found" };

    const user = await db.user.findOne({
      where: { username },
    });
    if (user === null)
      return { statusCode: HTTP.NotFound, data: "User not found" };

    const member = await board.addMember(user);
    return { statusCode: HTTP.OK, data: member };
  } catch (error) {
    debug("[getBoardMembers]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function removeBoardMember(boardId, username) {
  try {
    const board = await db.board.findByPk(boardId);
    if (board === null)
      return { statusCode: HTTP.NotFound, data: "Board Not Found" };

    const member = await db.user.findOne({
      where: { username },
    });
    if (member === null)
      return { statusCode: HTTP.NoContent, data: "Member not found" };

    await board.removeMember(member);
    return { statusCode: HTTP.OK, data: "User removed from board" };
  } catch (error) {
    debug("[getBoardMembers]: ", error);
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
  getBoardMembers,
  addBoardMember,
  removeBoardMember,
};
