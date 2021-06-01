const express = require("express");

const router = express.Router();

const passportAuthenticated = require("../../subscriber/passportAuthenticated");
const sameUserRequired = require("../../subscriber/sameUserRequired");
const boardPublicRequired = require("../../subscriber/boardPublicRequired");

const {
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
} = require("../../subscriber/belongingRequired");

const cardController = require("../../controller/card/cardController");

//* PUBLIC BOARD
router.get(
  "/boards/:boardId/cardlists/:cardlistId/cards",
  boardPublicRequired,
  cardlistBelongingBoardRequired,
  cardController.getAllCards
);
router.get(
  "/boards/:boardId/cardlists/:cardlistId/cards/:cardId",
  boardPublicRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.getCard
);
router.get(
  "/boards/:boardId/cardlists/:cardlistId/cards/:cardId/title",
  boardPublicRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.getCardTitle
);
router.get(
  "/boards/:boardId/cardlists/:cardlistId/cards/:cardId/description",
  boardPublicRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.getCardDescription
);
router.get(
  "/boards/:boardId/cardlists/:cardlistId/cards/:cardId/deadline",
  boardPublicRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.getCardDeadline
);
router.get(
  "/boards/:boardId/cardlists/:cardlistId/cards/:cardId/labels",
  boardPublicRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.getCardLabels
);
router.get(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards/:cardId/members",
  boardPublicRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.getCardMembers
);

//* PRIVATE BOARD

router.post(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardController.createCard
);

router.delete(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards/:cardId",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.deleteCard
);

router.get(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardController.getAllCards
);

router.get(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards/:cardId",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.getCard
);

router.get(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards/:cardId/title",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.getCardTitle
);
router.put(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards/:cardId/title",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.updateCardTitle
);

router.get(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards/:cardId/description",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.getCardDescription
);
router.put(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards/:cardId/description",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.updateCardDescription
);

router.get(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards/:cardId/deadline",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.getCardDeadline
);
router.put(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards/:cardId/deadline",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.updateCardDeadline
);
router.delete(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards/:cardId/deadline",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.removeCardDeadline
);

router.get(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards/:cardId/labels",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.getCardLabels
);
router.post(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards/:cardId/labels",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.addCardLabel
);
router.delete(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards/:cardId/labels/:labelId",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.removeCardLabel
);

router.get(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards/:cardId/members",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.getCardMembers
);
router.post(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards/:cardId/members",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.addCardMember
);
router.delete(
  "/:username/boards/:boardId/cardlists/:cardlistId/cards/:cardId/members/:memberUsername",
  passportAuthenticated,
  sameUserRequired,
  cardlistBelongingBoardRequired,
  cardBelongingCardlistRequired,
  cardController.removeCardMember
);

module.exports = router;
