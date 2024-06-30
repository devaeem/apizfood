const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
   image: {
    type: String,
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

const Banner =
  mongoose.models.Banner || mongoose.model("banner", BannerSchema);

  module.exports = { Banner };
