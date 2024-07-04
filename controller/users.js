const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.list = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});

    res.status(200).send({ users });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.create = async (req, res) => {
  try {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const existingUser = await prisma.user.findUnique({
      where: { username: username },
    });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "สร้างผู้ใช้สำเร็จ" });
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการสร้างผู้ใช้:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์" });
  }
};

exports.read = async (req, res) => {
  try {
    const users = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
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
