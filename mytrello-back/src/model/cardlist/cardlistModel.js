module.exports = (sequelize, DataTypes) => {
  const cardlist = sequelize.define(
    "cardlist",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );

  cardlist.associate = function associate(models) {
    cardlist.belongsTo(models.board);

    cardlist.hasMany(models.card);
  };

  return cardlist;
};
