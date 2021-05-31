module.exports = (sequelize, DataTypes) => {
  const card = sequelize.define(
    "card",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );

  card.associate = function associate(models) {
    card.belongsToMany(models.user, { through: "user_card" });

    card.belongsTo(models.cardlist);

    card.belongsToMany(models.label, { through: "card_label" });

    card.hasMany(models.comment);
    card.hasMany(models.checklist);
  };

  return card;
};
