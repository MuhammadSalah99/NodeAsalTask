module.exports = (sequelize, DataTypes) => {
  const Publisher = sequelize.define("Publisher", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    isWorking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  Publisher.associate = (models) => {
    Publisher.hasMany(models.Book);
  };

  return Publisher;
};
