const express = require("express");

const router = express.Router();

const passportAuthenticated = require("../../subscriber/passportAuthenticated");
const sameUserRequired = require("../../subscriber/sameUserRequired");
const boardPublicRequired = require("../../subscriber/boardPublicRequired");

const boardController = require("../../controller/board/boardController");

router.get("/boards", boardController.getAllPublicBoard);
router.get("/boards/:board_id", boardPublicRequired, boardController.getBoard);
router.get(
  "/boards/:board_id/title",
  boardPublicRequired,
  boardController.getBoardTitle
);
router.get(
  "/boards/:board_id/public",
  boardPublicRequired,
  boardController.isBoardPublic
);
router.get(
  "/boards/:board_id/auhtor",
  boardPublicRequired,
  boardController.getBoardAuthor
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
  "/:username/boards/:board_id",
  passportAuthenticated,
  sameUserRequired,
  boardController.deleteBoard
);

router.get(
  "/:username/boards/:board_id",
  passportAuthenticated,
  sameUserRequired,
  boardController.getBoard
);

router.get(
  "/:username/boards/:board_id/title",
  passportAuthenticated,
  sameUserRequired,
  boardController.getBoardTitle
);
router.put(
  "/:username/boards/:board_id/title",
  passportAuthenticated,
  sameUserRequired,
  boardController.updateBoardTitle
);

router.get(
  "/:username/boards/:board_id/public",
  passportAuthenticated,
  sameUserRequired,
  boardController.isBoardPublic
);
router.put(
  "/:username/boards/:board_id/public",
  passportAuthenticated,
  sameUserRequired,
  boardController.updateBoardPublic
);

router.get(
  "/:username/boards/:board_id/author",
  passportAuthenticated,
  sameUserRequired,
  boardController.getBoardAuthor
);

module.exports = router;
