const debug = require("debug")("service:userSetting");

const db = require("../../loader/sequelize");
const HTTP = require("../../config/HTTP");
const { getUserByUsername } = require("./getUser");

/**
 * Get all themes
 * @return {object} Return status response
 */
async function getAllThemes() {
  try {
    return {
      statusCode: HTTP.OK,
      data: db.user_setting.rawAttributes.theme.values,
    };
  } catch (err) {
    debug("[User Setting|Get All Theme]: ", err);
    return {
      statusCode: HTTP.InternalServerError,
      message: "Internal server error",
    };
  }
}

/**
 * Get user theme
 * @return {object} Return status response
 */
async function getUserTheme(username) {
  try {
    const user = await getUserByUsername(username);
    const userSetting = await user.getUser_setting();
    return {
      statusCode: HTTP.OK,
      data: userSetting.get().theme,
    };
  } catch (err) {
    debug("[User Setting|Get]: ", err);
    return {
      statusCode: HTTP.InternalServerError,
      data: {
        name: err.name,
        message: err.message,
      },
    };
  }
}

/**
 *
 * @param {Object} user User making the request
 * @param {Integer} user_id id user to update
 * @param {String} theme New theme
 */
async function updateUserTheme(username, theme) {
  try {
    const user = await getUserByUsername(username);
    const userSetting = await user.getUser_setting();

    await userSetting.update({
      theme,
    });
    await userSetting.save();
    return {
      statusCode: HTTP.OK,
      data: userSetting.get().theme,
    };
  } catch (err) {
    debug("[User Setting|Theme]: ", err);
    return {
      statusCode: HTTP.InternalServerError,
      data: {
        name: err.name,
        message: err.message,
      },
    };
  }
}

/**
 * Get all languagues
 * @return {object} Return status response
 */
async function getAllLanguages() {
  try {
    return {
      statusCode: HTTP.OK,
      data: db.user_setting.rawAttributes.language.values,
    };
  } catch (err) {
    debug("[User Setting|Get All Language]: ", err);
    return {
      statusCode: HTTP.InternalServerError,
      data: {
        name: err.name,
        message: err.message,
      },
    };
  }
}

/**
 * Get user language
 * @return {object} Return status response
 */
async function getUserLanguage(username) {
  try {
    const user = await getUserByUsername(username);
    const userSetting = await user.getUser_setting();
    return {
      statusCode: HTTP.OK,
      data: userSetting.get().language,
    };
  } catch (err) {
    debug("[User Setting|getUserLanguage]: ", err);
    return {
      statusCode: HTTP.InternalServerError,
      data: {
        name: err.name,
        message: err.message,
      },
    };
  }
}

/**
 *
 * @param {Object} user User making the request
 * @param {Integer} user_id id user to update
 * @param {String} language New language
 */
async function updateUserLanguage(username, language) {
  try {
    const user = await getUserByUsername(username);
    const userSetting = await user.getUser_setting();

    await userSetting.update({
      language,
    });
    await userSetting.save();
    return {
      statusCode: HTTP.OK,
      data: userSetting.get().language,
    };
  } catch (err) {
    debug("[User Setting|Language]: ", err);
    return {
      statusCode: HTTP.InternalServerError,
      data: {
        name: err.name,
        message: err.message,
      },
    };
  }
}

/**
 * Get the user setting
 * @param {Object} user_id User id
 */
async function getAllSettings(username) {
  try {
    const user = await getUserByUsername(username);
    const userSetting = await user.getUser_setting();
    return {
      statusCode: HTTP.OK,
      data: userSetting.get(),
    };
  } catch (err) {
    debug("[User Setting|Get]: ", err);
    return {
      statusCode: HTTP.InternalServerError,
      data: {
        name: err.name,
        message: err.message,
      },
    };
  }
}

/**
 *
 * @param {Object} user User making the request
 * @param {Integer} id id user to update
 * @param {String} values New theme
 */
async function updateAllSettings(username, values) {
  try {
    const user = await getUserByUsername(username);
    const userSetting = await user.getUser_setting();

    await userSetting.update(...values);
    await userSetting.save();
    return {
      statusCode: HTTP.OK,
      data: userSetting.get(),
    };
  } catch (err) {
    debug("[User Setting|Theme]: ", err);
    return {
      statusCode: HTTP.InternalServerError,
      data: {
        name: err.name,
        message: err.message,
      },
    };
  }
}

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
