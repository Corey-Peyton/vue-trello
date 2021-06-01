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
    {}
  );

  card.associate = function associate(models) {
    card.belongsToMany(models.user, { as: "members", through: "cardMembers" });

    card.belongsTo(models.cardlist);

    card.belongsToMany(models.label, { through: "cardLabels" });

    card.hasMany(models.comment);
    card.hasMany(models.checklist);
  };

  return card;
};
