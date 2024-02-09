const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgSrc: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Products", schema);
module.exports = Product;
