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
    comment.belongsToMany(models.user, { through: "userComments" });

    comment.belongsTo(models.card);
  };

  return comment;
};
