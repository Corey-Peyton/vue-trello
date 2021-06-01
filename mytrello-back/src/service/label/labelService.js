const debug = require("debug")("service:label");

const db = require("../../loader/sequelize");
const HTTP = require("../../config/HTTP");

async function createLabel(boardId, { title, color }) {
  try {
    const board = await db.board.findByPk(boardId);
    if (board === null)
      return { statusCode: HTTP.NoContent, data: "Board not found" };

    const label = await board.createLabel({ title, color });

    return { statusCode: HTTP.OK, data: label };
  } catch (error) {
    debug("[createLabel]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function deleteLabel(labelId) {
  try {
    const label = await db.label.findByPk(labelId);
    if (label === null)
      return { statusCode: HTTP.NotFound, data: "label Not Found" };

    await label.destroy();
    return { statusCode: HTTP.OK, data: "label deleted" };
  } catch (error) {
    debug("[deleteLabel]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function getAllLabels(boardId) {
  try {
    const board = await db.board.findByPk(boardId);
    if (board === null)
      return { statusCode: HTTP.NoContent, data: "Board not found" };
    const labels = await board.getLabels();

    return { statusCode: HTTP.OK, data: labels };
  } catch (error) {
    debug("[getAllLabels]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function getLabel(labelId) {
  try {
    const label = await db.label.findByPk(labelId);
    if (label === null)
      return { statusCode: HTTP.NoContent, data: "label not found" };

    return { statusCode: HTTP.OK, data: label };
  } catch (error) {
    debug("[getLabel]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function getLabelTitle(labelId) {
  try {
    const label = await db.board.findByPk(labelId);
    if (label === null)
      return { statusCode: HTTP.NoContent, data: "label not found" };

    return { statusCode: HTTP.OK, data: label.title };
  } catch (error) {
    debug("[getLabelTitle]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function updateLabelTitle(labelId, title) {
  try {
    const label = await db.board.findByPk(labelId);
    if (label === null)
      return { statusCode: HTTP.NoContent, data: "label not found" };

    await label.update({ title });

    return { statusCode: HTTP.OK, data: label };
  } catch (error) {
    debug("[updateLabelTitle]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function getLabelColor(labelId) {
  try {
    const label = await db.board.findByPk(labelId);
    if (label === null)
      return { statusCode: HTTP.NoContent, data: "label not found" };

    return { statusCode: HTTP.OK, data: label.color };
  } catch (error) {
    debug("[getLabelColor]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function updateLabelColor(labelId, color) {
  try {
    const label = await db.board.findByPk(labelId);
    if (label === null)
      return { statusCode: HTTP.NoContent, data: "label not found" };

    await label.update({ color });

    return { statusCode: HTTP.OK, data: label };
  } catch (error) {
    debug("[updateLabelColor]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

module.exports = {
  createLabel,
  deleteLabel,
  getAllLabels,
  getLabel,
  getLabelTitle,
  updateLabelTitle,
  getLabelColor,
  updateLabelColor,
};
