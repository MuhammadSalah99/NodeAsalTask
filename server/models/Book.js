const { publisher } = require("./Publisher.js");

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    BookId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BookTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BookPublisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PublishDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    BookAuthor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BookPdf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Tags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Units: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Book.associate = (models) => {
    Book.hasMany(models.Reserve);
  };

  return Book;
};
