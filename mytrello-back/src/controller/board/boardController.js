const HTTP = require("../../config/HTTP");
const boardservice = require("../../service/board/boardService");

async function getAllPublicBoard(_req, res) {
  const result = await boardservice.getAllPublicBoard();
  return res.status(result.statusCode).send(result.data);
}

async function getAllUserBoards(req, res) {
  const result = await boardservice.getAllUserBoards(req.params.username);
  return res.status(result.statusCode).send(result.data);
}

async function createBoard(req, res) {
  if (
    typeof req.body.title === "undefined" ||
    req.body.title === null ||
    typeof req.body.public === "undefined" ||
    req.body.public === null
  )
    return res.status(HTTP.BadRequest).send("Need title and public parameters");

  const result = await boardservice.createBoard(req.params.username, req.body);
  return res.status(result.statusCode).send(result.data);
}

async function deleteBoard(req, res) {
  const result = await boardservice.deleteBoard(req.params.boardId);
  return res.status(result.statusCode).send(result.data);
}

async function getBoard(req, res) {
  const result = await boardservice.getBoard(req.params.boardId);
  return res.status(result.statusCode).send(result.data);
}

async function getBoardTitle(req, res) {
  const result = await boardservice.getBoardTitle(req.params.boardId);
  return res.status(result.statusCode).send(result.data);
}

async function updateBoardTitle(req, res) {
  if (typeof req.body.title === "undefined" || req.body.title === null)
    return res.status(HTTP.BadRequest).send("Need title parameter");
  const result = await boardservice.updateBoardTitle(
    req.params.boardId,
    req.body.title
  );
  return res.status(result.statusCode).send(result.data);
}

async function isBoardPublic(req, res) {
  const result = await boardservice.isBoardPublic(req.params.boardId);
  return res.status(result.statusCode).send(result.data);
}

async function updateBoardPublic(req, res) {
  if (typeof req.body.public === "undefined" || req.body.public === null)
    return res.status(HTTP.BadRequest).send("Need public parameter");

  const result = await boardservice.updateBoardPublic(
    req.params.boardId,
    req.body.public
  );
  return res.status(result.statusCode).send(result.data);
}

async function getBoardAuthor(req, res) {
  const result = await boardservice.getBoardAuthor(req.params.boardId);
  return res.status(result.statusCode).send(result.data);
}

async function getBoardMembers(req, res) {
  const result = await boardservice.getBoardMembers(req.params.boardId);
  return res.status(result.statusCode).send(result.data);
}
async function addBoardMember(req, res) {
  if (typeof req.body.username === "undefined" || req.body.username === null)
    return res.status(HTTP.BadRequest).send("Need username parameter");
  const result = await boardservice.addBoardMember(
    req.params.boardId,
    req.body.username
  );
  return res.status(result.statusCode).send(result.data);
}
async function removeBoardMember(req, res) {
  const result = await boardservice.removeBoardMember(
    req.params.boardId,
    req.params.memberUsername
  );
  return res.status(result.statusCode).send(result.data);
}

// module.exports = new UserSettingController();
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
