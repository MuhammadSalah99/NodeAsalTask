module.exports = (sequelize, DataTypes) => {
  const Reserve = sequelize.define("Reserve", {
    PaymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfUnits: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Reserve;
};
