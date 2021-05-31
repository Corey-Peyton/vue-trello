module.exports = (sequelize, DataTypes) => {
  const label = sequelize.define(
    "label",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        default: "#000000",
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );

  label.associate = function associate(models) {
    label.belongsTo(models.board);

    label.belongsToMany(models.card, { through: "card_label" });
  };

  return label;
};
