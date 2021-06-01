module.exports = (sequelize, DataTypes) => {
  /* userSetting table */
  const userSetting = sequelize.define(
    "userSetting",
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
      timestamps: false,
    }
  );

  /* Model associate to userSetting */
  userSetting.associate = function associate() {};

  return userSetting;
};
