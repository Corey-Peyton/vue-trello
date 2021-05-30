const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const modelDirectory = path.join(__dirname, "/../model");
const env = process.env.NODE_ENV || "development";
const config = require(`../config/sequelize.js`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable],
    config.connection
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.connection
  );
}

/* Load all file in models */
const files = [];
const sortDir = (maniDir) => {
  const folders = [];
  const checkFile = (filePath) => fs.statSync(filePath).isFile();
  const sortPath = (dir) => {
    fs.readdirSync(dir)
      .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
      .forEach((res) => {
        const filePath = path.join(dir, res);
        if (checkFile(filePath)) {
          files.push(filePath);
        } else {
          folders.push(filePath);
        }
      });
  };
  folders.push(maniDir);
  let i = 0;
  do {
    sortPath(folders[i]);
    i += 1;
  } while (i < folders.length);
};
sortDir(modelDirectory);

files.forEach((file) => {
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const model = require(path.join("", file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
