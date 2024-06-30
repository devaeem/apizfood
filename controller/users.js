const { Users } = require("../model/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.list = async (req, res) => {
  try {
    const users = await Users.find({}).select("-password").exec();

    res.status(200).send({ users });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.create = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Users.findOne({ email: email });

    if (existingUser) {
      return res.status(400).send("User Already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Users({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).send({ msg: "Users Created Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.read = async (req, res) => {
  try {
    const users = await Users.findById(req.params.id);
    res.status(201).send({ users });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { dataUser } = req.body;
    const users = await Users.findByIdAndUpdate(
      id,
      { dataUser },
      { new: true }
    );
    res.status(201).send({ msg: "Users Updated Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.remove = async (req, res) => {
  try {
    const banner = await Users.findByIdAndDelete(req.params.id);
    res.status(201).send({ msg: "Users Deleted Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};
