const express = require("express");
const router = express.Router();

const { Book } = require("../models");

router.get("/", async (req, res) => {
  const listOfBooks = await Book.findAll();
  res.json(listOfBooks);
});
router.post("/", (req, res) => {
  const book = req.body;
  Book.create(book);
  console.log(book);
  res.json(book);
});
module.exports = router;
