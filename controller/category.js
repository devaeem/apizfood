const { Category } = require("../model/category");

exports.list = async (req, res) => {
  try {
    const category = await Category.find({}).sort({ createdAt: -1 });

    res.status(200).send({ category });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};
