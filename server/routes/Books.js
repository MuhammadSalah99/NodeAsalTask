const express = require("express");
const router = express.Router();

const { Book } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const listOfBooks = await Book.findAll();
  res.json(listOfBooks);
});

router.get("/search/:phrase", async (req, res) => {
  const phrase = req.params.phrase;
  const listOfBooks = await Book.findAll({
    where: {
      BookId: { [Op.like]: `%${phrase}%` },
      BookTitle: { [Op.like]: `%${phrase}%` },
      BookPublisher: { [Op.like]: `%${phrase}%` },
      BookAuthor: { [Op.like]: `%${phrase}%` },
      PublishDate: { [Op.like]: `%${phrase}%` },
    },
  });
  res.json(listOfBooks);
});

router.get("/searchId/:BookId", async (req, res) => {
  const BookId = req.params.BookId;
  const listOfBooks = await Book.findAll({
    where: {
      BookId: { [Op.like]: `%${BookId}%` },
    },
  });
  res.json(listOfBooks);
});

router.get("/searchPublisher/:BookPublisher", async (req, res) => {
  const BookPublisher = req.params.BookPublisher;
  const listOfBooks = await Book.findAll({
    where: {
      BookPublisher: { [Op.like]: `%${BookPublisher}%` },
    },
  });
  res.json(listOfBooks);
});

router.get("/searchTitle/:BookTitle", async (req, res) => {
  const BookTitle = req.params.BookTitle;
  const listOfBooks = await Book.findAll({
    where: {
      BookTitle: { [Op.like]: `%${BookTitle}%` },
    },
  });
  res.json(listOfBooks);
});

router.post("/", (req, res) => {
  const book = req.body;
  Book.create(book);
  console.log(book);
  res.json(book);
});
module.exports = router;
