module.exports = (sequelize, DataTypes) => {
  const cardlist = sequelize.define(
    "cardlist",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );

  cardlist.associate = function associate(models) {
    cardlist.belongsTo(models.board);

    cardlist.hasMany(models.card);
  };

  return cardlist;
};
