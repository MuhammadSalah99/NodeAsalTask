const express = require("express");
const router = express.Router();

const { Buyer } = require("../models");

router.get("/", async (req, res) => {
  const allBuyers = await Buyer.findAll();
  res.json(allBuyers);
});
router.post("/", (req, res) => {
  const buyer = req.body;
  Buyer.create(buyer);
  console.log(buyer);
  res.json(buyer);
});
module.exports = router;
