module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    "comment",
    {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {}
  );

  comment.associate = function associate(models) {
    comment.belongsTo(models.user, { as: "author" });

    comment.belongsTo(models.card);
  };

  return comment;
};
