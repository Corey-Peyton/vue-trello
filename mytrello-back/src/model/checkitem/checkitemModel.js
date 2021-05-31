module.exports = (sequelize, DataTypes) => {
  const checkitem = sequelize.define(
    "checkitem",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );

  checkitem.associate = function associate(models) {
    checkitem.belongsTo(models.checklist);
  };

  return checkitem;
};
