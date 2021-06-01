const HTTP = require("../../config/HTTP");
const cardservice = require("../../service/card/cardService");

async function createCard(req, res) {
  if (typeof req.body.title === "undefined" || req.body.title === null)
    return res.status(HTTP.BadRequest).send("Need title parameters");

  const result = await cardservice.createCard(
    req.params.cardlistId,
    req.body.title
  );
  return res.status(result.statusCode).send(result.data);
}

async function deleteCard(req, res) {
  const result = await cardservice.deleteCard(req.params.cardId);
  return res.status(result.statusCode).send(result.data);
}

async function getAllCards(req, res) {
  const result = await cardservice.getAllCards(req.params.cardlistId);
  return res.status(result.statusCode).send(result.data);
}

async function getCard(req, res) {
  const result = await cardservice.getCard(req.params.cardId);
  return res.status(result.statusCode).send(result.data);
}

async function getCardTitle(req, res) {
  const result = await cardservice.getCardTitle(req.params.cardId);
  return res.status(result.statusCode).send(result.data);
}

async function updateCardTitle(req, res) {
  if (typeof req.body.title === "undefined" || req.body.title === null)
    return res.status(HTTP.BadRequest).send("Need title parameter");

  const result = await cardservice.updateCardTitle(
    req.params.cardId,
    req.body.title
  );
  return res.status(result.statusCode).send(result.data);
}

async function getCardDescription(req, res) {
  const result = await cardservice.getCardDescription(req.params.cardId);
  return res.status(result.statusCode).send(result.data);
}

async function updateCardDescription(req, res) {
  if (
    typeof req.body.description === "undefined" ||
    req.body.description === null
  )
    return res.status(HTTP.BadRequest).send("Need description parameter");

  const result = await cardservice.updateCardDescription(
    req.params.cardId,
    req.body.description
  );
  return res.status(result.statusCode).send(result.data);
}

async function getCardDeadline(req, res) {
  const result = await cardservice.getCardDeadline(req.params.cardId);
  return res.status(result.statusCode).send(result.data);
}

async function updateCardDeadline(req, res) {
  // TODO VERIFIER PEUT ETRE LE FORMAT DE LA DATE ?
  if (typeof req.body.deadline === "undefined" || req.body.deadline === null)
    return res.status(HTTP.BadRequest).send("Need deadline parameter");

  const result = await cardservice.updateCardDeadline(
    req.params.cardId,
    req.body.deadline
  );
  return res.status(result.statusCode).send(result.data);
}
async function removeCardDeadline(req, res) {
  const result = await cardservice.removeCardDeadline(req.params.cardId);
  return res.status(result.statusCode).send(result.data);
}

async function getCardLabels(req, res) {
  const result = await cardservice.getCardLabels(req.params.cardId);
  return res.status(result.statusCode).send(result.data);
}

async function addCardLabel(req, res) {
  if (typeof req.body.labelId === "undefined" || req.body.labelId === null)
    return res.status(HTTP.BadRequest).send("Need labelId parameter");
  const result = await cardservice.addCardLabel(
    req.params.cardId,
    req.body.labelId
  );
  return res.status(result.statusCode).send(result.data);
}

async function removeCardLabel(req, res) {
  const result = await cardservice.removeCardLabel(
    req.params.cardId,
    req.params.labelId
  );
  return res.status(result.statusCode).send(result.data);
}

async function getCardMembers(req, res) {
  const result = await cardservice.getCardMembers(req.params.cardId);
  return res.status(result.statusCode).send(result.data);
}

async function addCardMember(req, res) {
  if (
    typeof req.body.memberUsername === "undefined" ||
    req.body.memberUsername === null
  )
    return res.status(HTTP.BadRequest).send("Need memberUsername parameter");

  const result = await cardservice.addCardMember(
    req.params.cardId,
    req.body.memberUsername
  );
  return res.status(result.statusCode).send(result.data);
}
async function removeCardMember(req, res) {
  const result = await cardservice.removeCardMember(
    req.params.cardId,
    req.params.memberUsername
  );
  return res.status(result.statusCode).send(result.data);
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
