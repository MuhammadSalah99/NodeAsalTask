const express = require("express");
const router = express.Router();

const { Book } = require("../models");
const { Op } = require("sequelize");

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 1;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: books } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, books, totalPages, currentPage };
};

router.get("/", async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Book.findAndCountAll({ limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });

  // res.json(listOfBooks);
});

router.get("/search/:phrase", async (req, res) => {
  const phrase = req.params.phrase;
  const { page, size, priceStart, priceEnd, unitStart, unitEnd } = req.query;

  const { limit, offset } = getPagination(page, size);

  Book.findAndCountAll({
    limit,
    offset,
    where: {
      [Op.and]: [
        { Price: { [Op.between]: [parseInt(priceStart), parseInt(priceEnd)] } },
        { Units: { [Op.between]: [parseInt(unitStart), parseInt(unitEnd)] } },
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
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});

router.get("/searchId/:BookId", async (req, res) => {
  const { page, size, priceStart, priceEnd, unitStart, unitEnd } = req.query;

  const BookId = req.params.BookId;

  const { limit, offset } = getPagination(page, size);

  Book.findAndCountAll({
    limit,
    offset,
    where: {
      [Op.and]: [
        { BookId: { [Op.like]: `%${BookId}%` } },
        { Price: { [Op.between]: [parseInt(priceStart), parseInt(priceEnd)] } },
        { Units: { [Op.between]: [parseInt(unitStart), parseInt(unitEnd)] } },
      ],
    },
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});

router.get("/searchPublisher/:BookPublisher", async (req, res) => {
  const { page, size, priceStart, priceEnd, unitStart, unitEnd } = req.query;

  const BookPublisher = req.params.BookPublisher;
  const { limit, offset } = getPagination(page, size);

  Book.findAndCountAll({
    limit,
    offset,
    where: {
      [Op.and]: [
        { BookPublisher: { [Op.like]: `%${BookPublisher}%` } },
        { Price: { [Op.between]: [parseInt(priceStart), parseInt(priceEnd)] } },
        { Units: { [Op.between]: [parseInt(unitStart), parseInt(unitEnd)] } },
      ],
    },
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});

router.get("/searchTitle/:BookTitle", async (req, res) => {
  const { page, size, priceStart, priceEnd, unitStart, unitEnd } = req.query;

  const BookTitle = req.params.BookTitle;

  const { limit, offset } = getPagination(page, size);

  Book.findAndCountAll({
    limit,
    offset,
    where: {
      [Op.and]: [
        { BookTitle: { [Op.like]: `%${BookTitle}%` } },
        { Price: { [Op.between]: [parseInt(priceStart), parseInt(priceEnd)] } },
        { Units: { [Op.between]: [parseInt(unitStart), parseInt(unitEnd)] } },
      ],
    },
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});

router.get("/tags/:Tags", async (req, res) => {
  const { page, size, priceStart, priceEnd, unitStart, unitEnd } = req.query;

  const Tags = req.params.Tags;

  const { limit, offset } = getPagination(page, size);

  Book.findAndCountAll({
    limit,
    offset,
    where: {
      [Op.and]: [
        { Tags: { [Op.like]: "%" + Tags + "%" } },
        { Price: { [Op.between]: [parseInt(priceStart), parseInt(priceEnd)] } },
        { Units: { [Op.between]: [parseInt(unitStart), parseInt(unitEnd)] } },
      ],
    },
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});

router.post("/", (req, res) => {
  const book = req.body;
  Book.create(book);
  console.log(book);
  res.json(book);
});
module.exports = router;
