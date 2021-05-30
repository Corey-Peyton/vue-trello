const service = require("../../service/user/userSettingService");

/**
 * Controller for get all setting
 * @param {Object} _req Request
 * @param {Object} res Response
 */
async function getAllThemes(_req, res) {
  const result = await service.getAllThemes();
  return res.status(result.statusCode).send(result.data);
}

/**
 * Controller for update theme
 * @param {Object} req Request
 * @param {Object} res Response
 */
async function updateUserTheme(req, res) {
  const result = await service.updateUserTheme(
    req.params.username,
    req.body.theme
  );
  return res.status(result.statusCode).send(result.data);
}

/**
 * Controller for get user theme
 * @param {Object} req Request
 * @param {Object} res Response
 */
async function getUserTheme(req, res) {
  console.log(req.params);
  const result = await service.getUserTheme(req.params.username);
  return res.status(result.statusCode).send(result.data);
}

/**
 * Controller for get all setting
 * @param {Object} _req Request
 * @param {Object} res Response
 */
async function getAllLanguages(_req, res) {
  const result = await service.getAllLanguages();
  return res.status(result.statusCode).send(result.data);
}

/**
 * Controller for get user language
 * @param {Object} req Request
 * @param {Object} res Response
 */
async function getUserLanguage(req, res) {
  const result = await service.getUserLanguage(req.params.username);
  return res.status(result.statusCode).send(result.data);
}

/**
 * Controller for update language
 * @param {Object} req Request
 * @param {Object} res Response
 */
async function updateUserLanguage(req, res) {
  const result = await service.updateUserLanguage(
    req.params.username,
    req.body.language
  );
  return res.status(result.statusCode).send(result.data);
}

/**
 * Controller for get all user setting
 * @param {Object} req Request
 * @param {Object} res Response
 */
async function getAllSettings(req, res) {
  const result = await service.getAllSettings(req.params.username);
  return res.status(result.statusCode).send(result.data);
}

/**
 * Controller for update all user setting
 * @param {Object} req Request
 * @param {Object} res Response
 */
async function updateAllSettings(req, res) {
  const result = await service.updateAllSettings(req.params.username, req.body);
  return res.status(result.statusCode).send(result.data);
}

// module.exports = new UserSettingController();
module.exports = {
  getAllThemes,
  getUserTheme,
  updateUserTheme,
  getAllLanguages,
  getUserLanguage,
  updateUserLanguage,
  getAllSettings,
  updateAllSettings,
};
