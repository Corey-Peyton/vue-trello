module.exports = (sequelize, DataTypes) => {
  const checklist = sequelize.define(
    "checklist",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );

  checklist.associate = function associate(models) {
    checklist.belongsTo(models.card);

    checklist.hasMany(models.checkitem);
  };

  return checklist;
};
