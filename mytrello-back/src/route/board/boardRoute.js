const express = require("express");

const router = express.Router();

const passportAuthenticated = require("../../subscriber/passportAuthenticated");
const sameUserRequired = require("../../subscriber/sameUserRequired");
const boardPublicRequired = require("../../subscriber/boardPublicRequired");

const boardController = require("../../controller/board/boardController");

router.get("/boards", boardController.getAllPublicBoard);
router.get("/boards/:boardId", boardPublicRequired, boardController.getBoard);
router.get(
  "/boards/:boardId/title",
  boardPublicRequired,
  boardController.getBoardTitle
);
router.get(
  "/boards/:boardId/public",
  boardPublicRequired,
  boardController.isBoardPublic
);
router.get(
  "/boards/:boardId/auhtor",
  boardPublicRequired,
  boardController.getBoardAuthor
);
router.get(
  "/boards/:boardId/members",
  boardPublicRequired,
  boardController.getBoardMembers
);

router.get(
  "/:username/boards",
  passportAuthenticated,
  sameUserRequired,
  boardController.getAllUserBoards
);

router.post(
  "/:username/boards",
  passportAuthenticated,
  sameUserRequired,
  boardController.createBoard
);

router.delete(
  "/:username/boards/:boardId",
  passportAuthenticated,
  sameUserRequired,
  boardController.deleteBoard
);

router.get(
  "/:username/boards/:boardId",
  passportAuthenticated,
  sameUserRequired,
  boardController.getBoard
);

router.get(
  "/:username/boards/:boardId/title",
  passportAuthenticated,
  sameUserRequired,
  boardController.getBoardTitle
);
router.put(
  "/:username/boards/:boardId/title",
  passportAuthenticated,
  sameUserRequired,
  boardController.updateBoardTitle
);

router.get(
  "/:username/boards/:boardId/public",
  passportAuthenticated,
  sameUserRequired,
  boardController.isBoardPublic
);
router.put(
  "/:username/boards/:boardId/public",
  passportAuthenticated,
  sameUserRequired,
  boardController.updateBoardPublic
);

router.get(
  "/:username/boards/:boardId/author",
  passportAuthenticated,
  sameUserRequired,
  boardController.getBoardAuthor
);

router.get(
  "/:username/boards/:boardId/members",
  passportAuthenticated,
  sameUserRequired,
  boardController.getBoardMembers
);
router.post(
  "/:username/boards/:boardId/members",
  passportAuthenticated,
  sameUserRequired,
  boardController.addBoardMember
);
router.delete(
  "/:username/boards/:boardId/members/:memberUsername",
  passportAuthenticated,
  sameUserRequired,
  boardController.removeBoardMember
);

module.exports = router;
