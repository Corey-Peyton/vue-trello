const HTTP = require("../../config/HTTP");
const cardlistservice = require("../../service/cardlist/cardlistService");

async function createCardlist(req, res) {
  if (typeof req.body.title === "undefined" || req.body.title === null)
    return res.status(HTTP.BadRequest).send("Need title parameters");

  const result = await cardlistservice.createCardlist(
    req.params.boardId,
    req.body
  );
  return res.status(result.statusCode).send(result.data);
}

async function deleteCardlist(req, res) {
  const result = await cardlistservice.deleteCardlist(req.params.cardlistId);
  return res.status(result.statusCode).send(result.data);
}

async function getAllCardlists(req, res) {
  const result = await cardlistservice.getAllCardlists(req.params.boardId);
  return res.status(result.statusCode).send(result.data);
}

async function getCardlist(req, res) {
  const result = await cardlistservice.getCardlist(req.params.cardlistId);
  return res.status(result.statusCode).send(result.data);
}

async function getCardlistTitle(req, res) {
  const result = await cardlistservice.getCardlistTitle(req.params.cardlistId);
  return res.status(result.statusCode).send(result.data);
}

async function updateCardlistTitle(req, res) {
  if (typeof req.body.title === "undefined" || req.body.title === null)
    return res.status(HTTP.BadRequest).send("Need title parameter");
  const result = await cardlistservice.updateCardlistTitle(
    req.params.cardlistId,
    req.body.title
  );
  return res.status(result.statusCode).send(result.data);
}

module.exports = {
  createCardlist,
  deleteCardlist,
  getAllCardlists,
  getCardlist,
  getCardlistTitle,
  updateCardlistTitle,
};
