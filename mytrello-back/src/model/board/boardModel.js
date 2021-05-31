module.exports = (sequelize, DataTypes) => {
  const board = sequelize.define(
    "board",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );

  board.associate = function associate(models) {
    board.belongsToMany(models.user, { through: "user_board" });
    board.belongsTo(models.user, { as: "author" });

    board.hasMany(models.cardlist);
    board.hasMany(models.label);
  };

  return board;
};
