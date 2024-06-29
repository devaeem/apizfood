const { Category } = require("../model/category");

exports.list = async (req, res) => {
  try {
    const search = req.query.search;

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    let filter = {};
    if (search) {
      filter = { name: { $regex: search, $options: "i" } };
    }

    console.log("search", search);
    const category = await Category.find(filter).sort({ createdAt: -1 }).skip(skip).limit(pageSize);
    const totalCategories = await Category.countDocuments(filter);
    const totalPages = Math.ceil(totalCategories / pageSize);

    res.status(200).send({ category,totalPages });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.create = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send({ category });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.read = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(201).send({ category });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      { _id: id },
      { name: name }
    );
    res.status(201).send({ msg: "Category Updated Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.remove = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(201).send({ msg: "Category Deleted Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};
