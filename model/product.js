const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryRef: {
     type: Schema.Types.ObjectId,
     ref: 'Category',
     required: true
    },
    desc: {
      type: String,
    },
    image: {
      type: Array,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

module.exports = { Product };
