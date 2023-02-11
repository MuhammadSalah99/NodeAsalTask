module.exports = (sequelize, DataTypes) => {
  const Buyer = sequelize.define("Buyer", {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    purchaseDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NationalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Buyer.associate = (models) => {
    Buyer.hasMany(models.Reserve);
  };
  return Buyer;
};
