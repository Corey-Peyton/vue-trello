const express = require("express");

const router = express.Router();

const passportAuthenticated = require("../../subscriber/passportAuthenticated");
const sameUserRequired = require("../../subscriber/sameUserRequired");
const boardPublicRequired = require("../../subscriber/boardPublicRequired");
const {
  labelBelongingBoardRequired,
} = require("../../subscriber/belongingRequired");

const labelController = require("../../controller/label/labelController");

//* PUBLIC BOARD

router.get(
  "/boards/:boardId/labels",
  boardPublicRequired,
  labelController.getAllLabels
);
router.get(
  "/boards/:boardId/labels/:labelId",
  boardPublicRequired,
  labelBelongingBoardRequired,
  labelController.getLabel
);
router.get(
  "/boards/:boardId/labels/:labelId/title",
  boardPublicRequired,
  labelBelongingBoardRequired,
  labelController.getLabelTitle
);
router.get(
  "/boards/:boardId/labels/:labelId/color",
  boardPublicRequired,
  labelBelongingBoardRequired,
  labelController.getLabelColor
);

// ?Maybe implement get Cards with specific label

//* PRIVATE BOARD

router.post(
  "/:username/boards/:boardId/labels",
  passportAuthenticated,
  sameUserRequired,
  labelController.createLabel
);

router.delete(
  "/:username/boards/:boardId/labels/:labelId",
  passportAuthenticated,
  sameUserRequired,
  labelBelongingBoardRequired,
  labelController.deleteLabel
);

router.get(
  "/:username/boards/:boardId/labels",
  passportAuthenticated,
  sameUserRequired,
  labelController.getAllLabels
);

router.get(
  "/:username/boards/:boardId/labels/:labelId",
  passportAuthenticated,
  sameUserRequired,
  labelBelongingBoardRequired,
  labelController.getLabel
);

router.get(
  "/:username/boards/:boardId/labels/:labelId/title",
  passportAuthenticated,
  sameUserRequired,
  labelBelongingBoardRequired,
  labelController.getLabelTitle
);
router.put(
  "/:username/boards/:boardId/labels/:labelId/title",
  passportAuthenticated,
  sameUserRequired,
  labelBelongingBoardRequired,
  labelController.updateLabelTitle
);

router.get(
  "/:username/boards/:boardId/labels/:labelId/color",
  passportAuthenticated,
  sameUserRequired,
  labelBelongingBoardRequired,
  labelController.getLabelColor
);
router.put(
  "/:username/boards/:boardId/labels/:labelId/color",
  passportAuthenticated,
  sameUserRequired,
  labelBelongingBoardRequired,
  labelController.updateLabelColor
);

module.exports = router;
