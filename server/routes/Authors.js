const express = require("express");
const router = express.Router();

const { Author } = require("../models");

router.get("/", async (req, res) => {
  const allAuthors = await Author.findAll();
  res.json(allAuthors);
});
router.post("/", (req, res) => {
  const author = req.body;
  Author.create(author);
  console.log(author);
  res.json(author);
});
module.exports = router;
