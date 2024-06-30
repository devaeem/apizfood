const { Banner } = require("../model/banner");

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

    const banner = await Banner.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);
    const totalBanner = await Banner.countDocuments(filter);
    const totalPages = Math.ceil(totalBanner / pageSize);

    res.status(200).send({ banner, totalPages });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.create = async (req, res) => {
  try {
    const banner = new Banner(req.body);
    await banner.save();
    res.status(201).send({ banner });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.read = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    res.status(201).send({ banner });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { image } = req.body;
    const banner = await Banner.findByIdAndUpdate(id, { image }, { new: true });
    res.status(201).send({ msg: "banner Updated Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.remove = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    res.status(201).send({ msg: "banner Deleted Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};
