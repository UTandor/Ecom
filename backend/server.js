const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const api = express();

api.use(cors());
api.use(express.json());

mongoose.connect(
  "mongodb+srv://ancrobot2244:Jahil341@cluster0.bhgwkdm.mongodb.net/ecommerce"
);

const productRouter = require("./routes/products");
api.use("/products", productRouter);

api.get("/", (req, res) => {
  res.send("I think serverless works...");
});

api.listen(3000)
