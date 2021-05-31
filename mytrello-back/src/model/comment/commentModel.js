module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    "comment",
    {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );

  comment.associate = function associate(models) {
    comment.belongsToMany(models.user, { through: "user_comment" });

    comment.belongsTo(models.card);
  };

  return comment;
};
