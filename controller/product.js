const { Product } = require("../model/product");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.list = async (req, res) => {
  try {
    const { search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const where = search ? { name: { contains: search } } : {};

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: Number(skip),
        take: Number(pageSize),
        orderBy: { name: "asc" },
        include: {
          Category: true,
          images: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      products,
      currentPage: Number(page),
      totalPages,
      totalCount,
      msg: "Product List Fetched Successfully",
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, desc, price, categoryId, Image } = req.body;

    const result = await prisma.$transaction(async (prisma) => {
      const product = await prisma.product.create({
        data: {
          name: name,
          desc: desc,
          price: price,
          categoryId: categoryId,
        },
      });

      const images = Image.map((url) => ({
        url: url,
        productId: product.id,
      }));

      await prisma.image.createMany({
        data: images,
      });

      return product;
    });

    // const { name, desc, price, categoryId } = req.body;

    // const product = await prisma.product.create({
    //   data: {
    //     name: name,
    //     desc: desc,
    //     price: price,
    //     categoryId: categoryId,
    //   },
    // });

    res.status(201).send({ msg: "Product Created Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.read = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        Category: true,
        images: true,
      },
    });
    res.status(201).send({ product, msg: "Product Fetched Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, desc, price, categoryId, Image } = req.body;

    const result = await prisma.$transaction(async (prisma) => {
      const product = await prisma.product.update({
        where: { id: id },
        data: {
          name: name,
          desc: desc,
          price: price,
          categoryId: categoryId,
        },
      });

      const images = Image.map((url) => ({
        url: url,
        productId: product.id,
      }));

      await prisma.image.createMany({
        data: images,
      });

      return product;
    });

    // const { image } = req.body;
    // const banner = await prisma.banner.update({
    //   where: { id: id },
    //   data: {
    //     images: image,
    //   },
    // });
    res.status(201).send({ msg: "Banner Updated Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await prisma.$transaction(async (prisma) => {

      await prisma.image.deleteMany({
        where: { productId: id },
      });

      const product = await prisma.product.delete({
        where: { id: id },
      });

      return product;
    });

    res.status(200).send({ msg: "Product Deleted Successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).send({ error: "Server Error", details: err.message });
  }
};

exports.removeImage = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await prisma.$transaction(async (prisma) => {

      const product = await prisma.product.delete({
        where: { id: id },
      });

      return product;
    });

    res.status(200).send({ msg: "ImagesProduct Deleted Successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).send({ error: "Server Error", details: err.message });
  }
};