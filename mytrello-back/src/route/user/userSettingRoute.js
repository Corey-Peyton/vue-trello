const express = require("express");

const router = express.Router();

const passportAuthenticated = require("../../subscriber/passportAuthenticated");
const sameUserRequired = require("../../subscriber/sameUserRequired");

const userSettingController = require("../../controller/user/userSettingController");

router.get(
  "/:username/settings",
  passportAuthenticated,
  userSettingController.getAllSettings
);

router.put(
  "/:username/settings",
  passportAuthenticated,
  sameUserRequired,
  userSettingController.updateAllSettings
);

router.get(
  "/:username/settings/themes",
  passportAuthenticated,
  userSettingController.getAllThemes
);

router.get(
  "/:username/settings/theme",
  passportAuthenticated,
  userSettingController.getUserTheme
);

router.put(
  "/:username/settings/theme",
  passportAuthenticated,
  sameUserRequired,
  userSettingController.updateUserTheme
);

router.get(
  "/:username/settings/languages",
  passportAuthenticated,
  userSettingController.getAllLanguages
);

router.get(
  "/:username/settings/language",
  passportAuthenticated,
  userSettingController.getUserLanguage
);

router.put(
  "/:username/settings/language",
  passportAuthenticated,
  sameUserRequired,
  userSettingController.updateUserLanguage
);

module.exports = router;
