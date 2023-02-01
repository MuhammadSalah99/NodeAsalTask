const express = require("express");
const router = express.Router();

const { Reserve } = require("../models");

router.get("/", async (req, res) => {
  const allReserves = await Reserve.findAll();
  res.json(allReserves);
});
router.post("/", (req, res) => {
  const reserve = req.body;
  Reserve.create(reserve);
  console.log(reserve);
  res.json(reserve);
});
module.exports = router;
