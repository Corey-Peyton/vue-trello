module.exports = (sequelize, DataTypes) => {
  const checkitem = sequelize.define(
    "checkitem",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
    },
    {}
  );

  checkitem.associate = function associate(models) {
    checkitem.belongsTo(models.checklist);
  };

  return checkitem;
};
