const express = require("express");

const router = express.Router();

const passportAuthenticated = require("../../subscriber/passportAuthenticated");
const sameUserRequired = require("../../subscriber/sameUserRequired");
const boardPublicRequired = require("../../subscriber/boardPublicRequired");
const {
  cardlistBelongingBoardRequired,
} = require("../../subscriber/belongingRequired");

const cardlistController = require("../../controller/cardlist/cardlistController");

router.get(
  "/boards/:boardId/cardlists",
  boardPublicRequired,
  cardlistController.getAllCardlists
);
router.get(
  "/boards/:boardId/cardlists/:cardlistId",
  boardPublicRequired,
  cardlistBelongingBoardRequired,
  cardlistController.getCardlist
);
router.get(
  "/boards/:boardId/cardlists/:cardlistId/title",
  boardPublicRequired,
  cardlistBelongingBoardRequired,
  cardlistController.getCardlistTitle
);

router.post(
  "/:username/boards/:boardId/cardlists",
  passportAuthenticated,
  sameUserRequired,
  cardlistController.createCardlist
);

router.delete(
  "/:username/boards/:boardId/cardlists/:cardlistId",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardlistController.deleteCardlist
);

router.get(
  "/:username/boards/:boardId/cardlists",
  passportAuthenticated,
  sameUserRequired,
  cardlistController.getAllCardlists
);

router.get(
  "/:username/boards/:boardId/cardlists/:cardlistId",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardlistController.getCardlist
);

router.get(
  "/:username/boards/:boardId/cardlists/:cardlistId/title",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardlistController.getCardlistTitle
);
router.put(
  "/:username/boards/:boardId/cardlists/:cardlistId/title",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardlistController.updateCardlistTitle
);

module.exports = router;
