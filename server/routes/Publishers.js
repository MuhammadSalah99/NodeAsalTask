const express = require("express");
const router = express.Router();

const { Publisher } = require("../models");

router.get("/", async (req, res) => {
  const listOfPublisher = await Publisher.findAll();
  res.json(listOfPublisher);
});
router.post("/", (req, res) => {
  const publisher = req.body;
  Publisher.create(publisher);
  console.log(publisher);
  res.json(publisher);
});
module.exports = router;
