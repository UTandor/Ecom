const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const mongoose = require("mongoose");

const api = express();
const router = express.Router();

api.use(cors());
api.use(express.json());

mongoose.connect(
  "mongodb+srv://ancrobot2244:Jahil341@cluster0.bhgwkdm.mongodb.net/ecommerce"
);

const productRouter = require("../routes/products");
router.use("/products", productRouter);

router.get("/", (req, res) => {
  res.send("I think serverless works...");
});

api.use("/.netlify/functions/api", router);

module.exports.handler = serverless(api);
