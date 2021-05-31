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
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  user.associate = function associate(models) {
    user.hasOne(models.user_setting);

    user.belongsToMany(models.board, { through: "board_member" });
    user.belongsToMany(models.card, { through: "user_card" });
    user.belongsToMany(models.comment, { through: "user_comment" });
  };

  return user;
};
