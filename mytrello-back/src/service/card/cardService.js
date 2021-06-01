const debug = require("debug")("service:card");

const db = require("../../loader/sequelize");
const HTTP = require("../../config/HTTP");

async function createCard(cardlistId, title) {
  try {
    const cardlist = await db.cardlist.findByPk(cardlistId);
    if (cardlist === null)
      return { statusCode: HTTP.NoContent, data: "Cardlist not found" };

    const card = await cardlist.createCard({ title });

    return { statusCode: HTTP.OK, data: card };
  } catch (error) {
    debug("[createCard]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function deleteCard(cardId) {
  try {
    const card = await db.card.findByPk(cardId);
    if (card === null)
      return { statusCode: HTTP.NotFound, data: "Card Not Found" };

    await card.destroy();
    return { statusCode: HTTP.OK, data: "Card deleted" };
  } catch (error) {
    debug("[deleteCard]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function getAllCards(cardlistId) {
  try {
    const cardlist = await db.cardlist.findByPk(cardlistId);
    if (cardlist === null)
      return { statusCode: HTTP.NoContent, data: "Cardlist not found" };
    const cards = await cardlist.getCards();

    return { statusCode: HTTP.OK, data: cards };
  } catch (error) {
    debug("[getSomethinggetAllCards: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function getCard(cardId) {
  try {
    const card = await db.card.findByPk(cardId, {
      include: [
        {
          model: db.user,
          as: "members",
          attributes: { exclude: ["password"] },
        },
        db.label,
        db.comment,
        db.checklist,
      ],
    });
    if (card === null)
      return { statusCode: HTTP.NotFound, data: "Card Not Found" };

    return { statusCode: HTTP.OK, data: card };
  } catch (error) {
    debug("[getCard]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function getCardTitle(cardId) {
  try {
    const card = await db.card.findByPk(cardId);
    if (card === null)
      return { statusCode: HTTP.NotFound, data: "Card Not Found" };

    return { statusCode: HTTP.OK, data: card.title };
  } catch (error) {
    debug("[getCardTitle]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function updateCardTitle(cardId, title) {
  try {
    const card = await db.card.findByPk(cardId);
    if (card === null)
      return { statusCode: HTTP.NotFound, data: "Card Not Found" };

    await card.update({ title });
    return { statusCode: HTTP.OK, data: card };
  } catch (error) {
    debug("[updateCardTitle]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function getCardDescription(cardId) {
  try {
    const card = await db.card.findByPk(cardId);
    if (card === null)
      return { statusCode: HTTP.NotFound, data: "Card Not Found" };

    return { statusCode: HTTP.OK, data: card.description };
  } catch (error) {
    debug("[getCardDescription]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function updateCardDescription(cardId, description) {
  try {
    const card = await db.card.findByPk(cardId);
    if (card === null)
      return { statusCode: HTTP.NotFound, data: "Card Not Found" };

    await card.update({ description });
    return { statusCode: HTTP.OK, data: card };
  } catch (error) {
    debug("[updateCardDescription]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function getCardDeadline(cardId) {
  try {
    const card = await db.card.findByPk(cardId);
    if (card === null)
      return { statusCode: HTTP.NotFound, data: "Card Not Found" };

    return { statusCode: HTTP.OK, data: card.deadline };
  } catch (error) {
    debug("[getCardDeadline]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function updateCardDeadline(cardId, deadline) {
  try {
    const card = await db.card.findByPk(cardId);
    if (card === null)
      return { statusCode: HTTP.NotFound, data: "Card Not Found" };

    await card.update({ deadline });
    return { statusCode: HTTP.OK, data: card };
  } catch (error) {
    debug("[updateCardDeadline]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function removeCardDeadline(cardId) {
  try {
    const card = await db.card.findByPk(cardId);
    if (card === null)
      return { statusCode: HTTP.NotFound, data: "Card Not Found" };

    await card.update({ deadline: null });
    return { statusCode: HTTP.OK, data: card };
  } catch (error) {
    debug("[removeCardDeadline]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

async function getCardLabels(cardId) {
  try {
    const card = await db.card.findByPk(cardId);
    if (card === null)
      return { statusCode: HTTP.NotFound, data: "Card Not Found" };

    const labels = await card.getLabels();
    return { statusCode: HTTP.OK, data: labels };
  } catch (error) {
    debug("[getCardLabels]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function addCardLabel(cardId, labelId) {
  try {
    const card = await db.card.findByPk(cardId);
    if (card === null)
      return { statusCode: HTTP.NotFound, data: "Card Not Found" };

    const label = await db.label.findByPk(labelId);
    if (label === null)
      return { statusCode: HTTP.NotFound, data: "Label not found" };

    const cardLabel = await card.addLabel(label);
    return { statusCode: HTTP.OK, data: cardLabel };
  } catch (error) {
    debug("[addCardLabel]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function removeCardLabel(cardId, labelId) {
  try {
    const card = await db.card.findByPk(cardId);
    if (card === null)
      return { statusCode: HTTP.NotFound, data: "Card Not Found" };

    const label = await db.label.findByPk(labelId);
    if (label === null)
      return { statusCode: HTTP.NoContent, data: "Label not found" };

    await card.removeMember(label);
    return { statusCode: HTTP.OK, data: "Label removed from card" };
  } catch (error) {
    debug("[removeCardLabel]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function getCardMembers(cardId) {
  try {
    const card = await db.card.findByPk(cardId);
    if (card === null)
      return { statusCode: HTTP.NotFound, data: "Card Not Found" };

    const members = await card.getMembers({
      attributes: { exclude: ["password"] },
    });
    return { statusCode: HTTP.OK, data: members };
  } catch (error) {
    debug("[getCardMembers]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function addCardMember(cardId, memberUsername) {
  try {
    const card = await db.card.findByPk(cardId);
    if (card === null)
      return { statusCode: HTTP.NotFound, data: "Card Not Found" };

    const user = await db.user.findOne({
      where: { username: memberUsername },
    });
    if (user === null)
      return { statusCode: HTTP.NotFound, data: "User not found" };

    const member = await card.addMember(user);
    return { statusCode: HTTP.OK, data: member };
  } catch (error) {
    debug("[addCardMember]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}
async function removeCardMember(cardId, memberUsername) {
  try {
    const card = await db.card.findByPk(cardId);
    if (card === null)
      return { statusCode: HTTP.NotFound, data: "Card Not Found" };

    const member = await db.user.findOne({
      where: { username: memberUsername },
    });
    if (member === null)
      return { statusCode: HTTP.NoContent, data: "Member not found" };

    await card.removeMember(member);
    return { statusCode: HTTP.OK, data: "Member removed from card" };
  } catch (error) {
    debug("[removeCardMember]: ", error);
    return {
      statusCode: HTTP.InternalServerError,
      data: { name: error.name, message: error.message },
    };
  }
}

module.exports = {
  createCard,
  deleteCard,
  getAllCards,
  getCard,
  getCardTitle,
  updateCardTitle,
  getCardDescription,
  updateCardDescription,
  getCardDeadline,
  updateCardDeadline,
  removeCardDeadline,
  getCardLabels,
  addCardLabel,
  removeCardLabel,
  getCardMembers,
  addCardMember,
  removeCardMember,
};
