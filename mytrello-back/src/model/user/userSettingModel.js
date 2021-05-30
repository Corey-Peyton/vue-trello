module.exports = (sequelize, DataTypes) => {
  /* User_setting table */
  const user_setting = sequelize.define(
    "user_setting",
    {
      theme: {
        type: DataTypes.ENUM("Light", "Dark"),
        allowNull: false,
        defaultValue: "Light",
        validate: {
          isIn: [["Light", "Dark"]],
        },
      },
      language: {
        type: DataTypes.ENUM("en", "fr"),
        allowNull: false,
        defaultValue: "en",
        validate: {
          isIn: [["en", "fr"]],
        },
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Model associate to user_setting */
  user_setting.associate = function associate() {};

  return user_setting;
};
