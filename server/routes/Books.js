const express = require("express");
const router = express.Router();

const { Book } = require("../models");
const { Op } = require("sequelize");
const ErorrResposnse = require("../utils/errorResponse");
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

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  Book.findByPk(id)
    .then((data) => {
      const response = data;
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

router.get("/searchAuth/:BookAuthor", async (req, res) => {
  const { page, size, priceStart, priceEnd, unitStart, unitEnd } = req.query;

  const BookAuthor = req.params.BookAuthor;
  const { limit, offset } = getPagination(page, size);

  Book.findAndCountAll({
    limit,
    offset,
    where: {
      [Op.and]: [
        { BookAuthor: { [Op.like]: `%${BookAuthor}%` } },
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

router.put("/:id", function (req, res, next) {
  let _id = parseInt(req.params.id);
  Book.update({ Units: req.body.Units }, { where: { id: _id } })
    .then(function (rowsUpdated) {
      res.json(rowsUpdated);
    })
    .catch(next);
});
router.post("/", (req, res, next) => {
  const book = req.body;
  Book.create(book)
    .then((ress) => {
      console.log(res);
      console.log(book);
      res.json({ book: book, sucess: true });
    })
    .catch((err) => {
      next(new ErorrResposnse(`Erorr with posting a new book ${err}`, 400));
    });
});
module.exports = router;
