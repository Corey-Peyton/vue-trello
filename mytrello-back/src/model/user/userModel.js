const validator = require("validator");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          fn(val) {
            if (!validator.isEmail(val)) {
              throw new Error("[ReMeet-api|models|user] Invalid Email address");
            }
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  user.associate = function associate(models) {
    user.hasOne(models.userSetting);

    user.belongsToMany(models.board, { through: "boardMembers" });
    user.belongsToMany(models.card, { through: "cardMembers" });

    user.hasMany(models.comment);
  };

  return user;
};
