var express = require("express");
var router = express.Router();
const Cars = require("../src/models/carSchema");
const auth = require("../src/middlewares/auth");

router.get("/", async function(req, res, next) {
  const sort = {};
  // localhost:3000/cars/?sortBy=make_asc
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split("_");
    sort[parts[0]] = parts[1] === "asc" ? 1 : -1;
  }

  try {
    const data = await Cars.find({}).sort(sort);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", auth, async function(req, res) {
  const car = new Cars(req.body);
  try {
    const data = await car.save();
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const updates = Object.keys(req.body);
  try {
    const car = await Cars.findById(req.params.id);

    if (!car) return res.status(404).send();
    updates.forEach(update => (car[update] = req.body[update]));
    data = await car.save();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/samecompany/:company", async function(req, res) {
  try {
    if (!req.params.company)
      return res.status(400).send("Pass The Model To Match");
    console.log(req.params.make);

    const data = await Cars.findSameCompany(req.params.company);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/samemake/:make", async function(req, res) {
  try {
    if (!req.params.make)
      return res.status(400).send("Pass The Model To Match");
    console.log(req.params.make);

    const data = await Cars.findSameModel(req.params.make);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/samecolor/:color", async function(req, res) {
  try {
    if (!req.params.color)
      return res.status(400).send("Pass The Color To Match");
    console.log(req.params.color);

    const data = await Cars.findSameColor(req.params.color);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/sameprice/:price", async function(req, res) {
  try {
    if (!req.params.price)
      return res.status(400).send("Pass The price To Match");
    console.log(req.params.price);

    const data = await Cars.findSamePrice(req.params.price);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/samename/:name", async function(req, res) {
  try {
    if (!req.params.name) return res.status(400).send("Pass The Name To Match");
    console.log(req.params.name);

    const data = await Cars.findSameName(req.params.name);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
