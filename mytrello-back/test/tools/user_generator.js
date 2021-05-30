const bcrypt = require("bcrypt");

const default_user = {
  username: "Armandirow",
  firstname: "Armand",
  lastname: "Sirol",
  email: "armand.sirol@gmail.com",
  password: "password",
};

async function createDefaultUser(db) {
  /* Create default user */
  return db.user.create({
    ...default_user,
    password: await bcrypt.hash(default_user.password, 10),
  });
}

module.exports = {
  default_user,
  createDefaultUser,
};
