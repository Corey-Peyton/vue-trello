const HTTP = require("../../config/HTTP");
const labelService = require("../../service/label/labelService");

async function createLabel(req, res) {
  if (typeof req.body.color === "undefined" || req.body.color === null)
    return res.status(HTTP.BadRequest).send("Need color parameters");

  if (typeof req.body.title === "undefined") req.body.title = null;

  const result = await labelService.createLabel(req.params.boardId, req.body);
  return res.status(result.statusCode).send(result.data);
}

async function deleteLabel(req, res) {
  const result = await labelService.deleteLabel(req.params.labelId);
  return res.status(result.statusCode).send(result.data);
}

async function getAllLabels(req, res) {
  const result = await labelService.getAllLabels(req.params.boardId);
  return res.status(result.statusCode).send(result.data);
}

async function getLabel(req, res) {
  const result = await labelService.getLabel(req.params.labelId);
  return res.status(result.statusCode).send(result.data);
}

async function getLabelTitle(req, res) {
  const result = await labelService.getLabelTitle(req.params.labelId);
  return res.status(result.statusCode).send(result.data);
}

async function updateLabelTitle(req, res) {
  if (typeof req.body.title === "undefined" || req.body.title === null)
    return res.status(HTTP.BadRequest).send("Need title parameter");
  const result = await labelService.updateLabelTitle(
    req.params.labelId,
    req.body.title
  );
  return res.status(result.statusCode).send(result.data);
}

async function getLabelColor(req, res) {
  const result = await labelService.getLabelColor(req.params.labelId);
  return res.status(result.statusCode).send(result.data);
}

async function updateLabelColor(req, res) {
  if (typeof req.body.color === "undefined" || req.body.color === null)
    return res.status(HTTP.BadRequest).send("Need color parameter");
  const result = await labelService.updateLabelColor(
    req.params.labelId,
    req.body.color
  );
  return res.status(result.statusCode).send(result.data);
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
