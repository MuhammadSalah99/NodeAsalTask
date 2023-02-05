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
  const priceStart = parseInt(req.query.priceStart);
  const priceEnd = parseInt(req.query.priceEnd);
  const unitStart = parseInt(req.query.unitStart);
  const unitEnd = parseInt(req.query.unitEnd);
  const listOfBooks = await Book.findAll({
    where: {
      [Op.and]: [
        { Price: { [Op.between]: [priceStart, priceEnd] } },
        { Units: { [Op.between]: [unitStart, unitEnd] } },
        {
          [Op.or]: [
            { BookId: { [Op.like]: "%" + phrase + "%" } },
            { BookTitle: { [Op.like]: "%" + phrase + "%" } },
            { BookPublisher: { [Op.like]: "%" + phrase + "%" } },
            { BookAuthor: { [Op.like]: "%" + phrase + "%" } },
            { PublishDate: { [Op.like]: "%" + phrase + "%" } },
          ],
        },
      ],
    },
  });
  res.json(listOfBooks);
});

router.get("/searchId/:BookId", async (req, res) => {
  const priceStart = parseInt(req.query.priceStart);
  const priceEnd = parseInt(req.query.priceEnd);
  const unitStart = parseInt(req.query.unitStart);
  const unitEnd = parseInt(req.query.unitEnd);
  const BookId = req.params.BookId;
  const listOfBooks = await Book.findAll({
    where: {
      [Op.and]: [
        { BookId: { [Op.like]: `%${BookId}%` } },
        { Price: { [Op.between]: [priceStart, priceEnd] } },
        { Units: { [Op.between]: [unitStart, unitEnd] } },
      ],
    },
  });
  res.json(listOfBooks);
});

router.get("/searchPublisher/:BookPublisher", async (req, res) => {
  const priceStart = parseInt(req.query.priceStart);
  const priceEnd = parseInt(req.query.priceEnd);
  const unitStart = parseInt(req.query.unitStart);
  const unitEnd = parseInt(req.query.unitEnd);
  const BookPublisher = req.params.BookPublisher;
  const listOfBooks = await Book.findAll({
    where: {
      [Op.and]: [
        { BookPublisher: { [Op.like]: `%${BookPublisher}%` } },
        { Price: { [Op.between]: [priceStart, priceEnd] } },
        { Units: { [Op.between]: [unitStart, unitEnd] } },
      ],
    },
  });
  res.json(listOfBooks);
});

router.get("/searchTitle/:BookTitle", async (req, res) => {
  const priceStart = parseInt(req.query.priceStart);
  const priceEnd = parseInt(req.query.priceEnd);
  const unitStart = parseInt(req.query.unitStart);
  const unitEnd = parseInt(req.query.unitEnd);
  const BookTitle = req.params.BookTitle;
  const listOfBooks = await Book.findAll({
    where: {
      [Op.and]: [
        { BookTitle: { [Op.like]: `%${BookTitle}%` } },
        { Price: { [Op.between]: [priceStart, priceEnd] } },
        { Units: { [Op.between]: [unitStart, unitEnd] } },
      ],
    },
  });
  res.json(listOfBooks);
});

router.get("/tags/:Tags", async (req, res) => {
  const priceStart = parseInt(req.query.priceStart);
  const priceEnd = parseInt(req.query.priceEnd);
  const unitStart = parseInt(req.query.unitStart);
  const unitEnd = parseInt(req.query.unitEnd);
  const Tags = req.params.Tags;
  const listOfBooks = await Book.findAll({
    where: {
      [Op.and]: [
        { Tags: { [Op.like]: "%" + phrase + "%" } },
        { Price: { [Op.between]: [priceStart, priceEnd] } },
        { Units: { [Op.between]: [unitStart, unitEnd] } },
      ],
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
