const { Product } = require("../model/product");

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

    const product = await Product.find(filter)
      .populate("categoryRef")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);
    const totalCategories = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalCategories / pageSize);

    res.status(200).send({ product, totalPages });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.create = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send({ product });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.read = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryRef"
    );
    res.status(201).send({ product });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { ...updateData } = req.body;
    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(201).send({ msg: "Product Updated Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.remove = async (req, res) => {
  try {
    const category = await Product.findByIdAndDelete(req.params.id);
    res.status(201).send({ msg: "Product Deleted Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};
