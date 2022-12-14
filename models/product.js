const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    product_name: {
      required: true,
      type: String,
    },
    desc: {
      required: true,
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    categoryId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    size: {
      type: String,
      required: true,
    },
    stock: { type: Number, required: true },
    offerprice:{
      type: Number,
      default:0,
    },
    price: {
      type: Number,
      required: true,
    },  
    image: Array
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", ProductSchema);
