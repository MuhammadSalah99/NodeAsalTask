module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define("Author", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAlive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    dateOfDeath: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    officalWebsite: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Author.associate = (models) => {
    Author.hasMany(models.Book);
  };

  return Author;
};
