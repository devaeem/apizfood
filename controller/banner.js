
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


exports.list = async (req, res) => {
  try {
    const {search} = req.query
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const where =  search ? { images: { contains: search } } : {};




    const [banner, totalCount] = await Promise.all([
      prisma.banner.findMany({
        where,
        skip: Number(skip),
        take: Number(pageSize),
        orderBy: { images: 'asc' }
      }),
      prisma.banner.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);


    res.status(200).json({
      banner,
      currentPage: Number(page),
      totalPages,
      totalCount,
      msg: "banner List Fetched Successfully",
    });
  } catch (err) {
    console.error("Error fetching banner:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};


exports.create = async (req, res) => {
  try {
    const { images } = await req.body;
    const banner = await prisma.banner.create({
      data: {
        images: images,
      },
    });
    res.status(201).send({ msg: "Banner Created Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};



exports.read = async (req, res) => {
  try {
    const banner = await prisma.banner.findUnique({
      where: { id: req.params.id },
    });
    res.status(201).send({ banner, msg: "Banner Fetched Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { images } = req.body;
    const banner = await prisma.banner.update({
      where: { id: id },
      data: {
        images: images,
      },
    });
    res.status(201).send({ msg: "Banner Updated Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.remove = async (req, res) => {
  try {
    const banner = await prisma.banner.delete({
      where: { id: req.params.id },
    });
    res.status(201).send({ msg: "Banner Deleted Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};
