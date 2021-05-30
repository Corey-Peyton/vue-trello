const db = require("../../loader/sequelize");

async function getAllUsers() {
  return db.user.findAll({
    attributes: { exclude: ["password"] },
  });
}

async function getUserById(user_id) {
  return db.user.findByPk(user_id, {
    attributes: { exclude: ["password"] },
    include: [
      {
        model: db.user_setting,
      },
    ],
  });
}

async function getUserByUsername(username) {
  const user = await db.user.findAll({
    where: { username },
    attributes: { exclude: ["password"] },
    include: [
      {
        model: db.user_setting,
      },
    ],
  });
  return user.length > 0 ? user[0] : null;
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
};
