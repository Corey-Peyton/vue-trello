const debug = require("debug")("express-microservice:passport");

const db = require("../loader/sequelize");

/**
 * Get user with username client
 * @param {string} username username client
 */
async function getUserByUsername(username) {
  try {
    const user = await db.user.findAll({
      where: { username },
      include: [
        {
          model: db.user_setting,
          as: "user_setting",
        },
      ],
    });
    return user.length > 0 ? user[0] : null;
  } catch (err) {
    debug("Error:", err);
    return null;
  }
}

/**
 * Get user with email client
 * @param {string} email Email client
 */
async function getUserByEmail(email) {
  try {
    const user = await db.user.findAll({
      where: { email },
      include: [
        {
          model: db.user_setting,
          as: "user_setting",
        },
      ],
    });
    return user.length > 0 ? user[0] : null;
  } catch (err) {
    debug("Error:", err);
    return null;
  }
}

/**
 * Get user from Id user
 * @param {Interger} id Id client
 */
async function getUserById(id) {
  try {
    const user = await db.user.findAll({
      where: { id },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: db.user_setting,
          as: "user_setting",
        },
      ],
    });
    return user.length > 0 ? user[0] : null;
  } catch (err) {
    debug("Error:", err);
    return null;
  }
}

module.exports = {
  getUserByUsername,
  getUserByEmail,
  getUserById,
};
