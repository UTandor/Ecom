const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/", async (req, res) => {
  try {
    const { name, minPrice, maxPrice, category, sort } = req.query;

    let query = {};

    if (name) {
      query.name = { $regex: new RegExp(`.*${name}.*`, "i") };
    }

    if (maxPrice) {
      const parsedMaxPrice = parseFloat(maxPrice);
      if (!isNaN(parsedMaxPrice)) {
        query.price = { ...(query.price || {}), $lte: parsedMaxPrice };
      } else {
        return res.status(400).json({
          error: "maxPrice should be in numerical form (int/float)",
          maxPrice: maxPrice,
        });
      }
    }

    if (minPrice) {
      const parsedMinPrice = parseFloat(minPrice);
      if (!isNaN(parsedMinPrice)) {
        query.price = { ...(query.price || {}), $gte: parsedMinPrice };
      } else {
        return res.status(400).json({
          error: "minPrice should be in numerical form (int/float)",
          minPrice: minPrice,
        });
      }
    }

    if (category) {
      const categories = category.split(",");
      query.category = { $in: categories };
    }

    const products = await Product.find(query);
    if (sort) {
      if (sort === "price") {
        products.sort((a, b) => a.price - b.price);
      } else if (sort === "name") {
        products.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === "-price") {
        products.sort((a, b) => b.price - a.price);
      } else if (sort === "-name") {
        products.sort((a, b) => b.name.localeCompare(a.name));
      }
    }

    res.status(200).json({ products: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = { id: id };

    const product = await Product.findOne(query);

    res.json({ product: product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
