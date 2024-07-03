const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.list = async (req, res) => {
  try {
    const {search} = req.query
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const where =  search ? { name: { contains: search } } : {};




    const [category, totalCount] = await Promise.all([
      prisma.category.findMany({
        where,
        skip: Number(skip),
        take: Number(pageSize),
        orderBy: { name: 'asc' }
      }),
      prisma.category.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);


    res.status(200).json({
      category,
      currentPage: Number(page),
      totalPages,
      totalCount,
      msg: "Category List Fetched Successfully",
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = await req.body;
    const category = await prisma.category.create({
      data: {
        name: name,
      },
    });

    res.status(201).send({ category, msg: "Category Created Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.read = async (req, res) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: req.params.id },
    });
    res.status(201).send({ category, msg: "Category Fetched Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const category = await prisma.category.update({
      where: { id: id },
      data: {
        name: name,
      },
    });
    res.status(201).send({ msg: "Category Updated Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.remove = async (req, res) => {
  try {
    const category = await prisma.category.delete({
      where: { id: req.params.id },
    });
    //const category = await Category.findByIdAndDelete(req.params.id);
    res.status(201).send({ msg: "Category Deleted Successfully" });
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

// exports.list = async (req, res) => {
//   try {
//     const search = req.query.search;

//     const page = parseInt(req.query.page) || 1;
//     const pageSize = parseInt(req.query.pageSize) || 10;
//     const skip = (page - 1) * pageSize;

//     let filter = {};
//     if (search) {
//       filter = { name: { $regex: search, $options: "i" } };
//     }

//     const category = await Category.find(filter).sort({ createdAt: -1 }).skip(skip).limit(pageSize);
//     const totalCategories = await Category.countDocuments(filter);
//     const totalPages = Math.ceil(totalCategories / pageSize);

//     res.status(200).send({ category,totalPages });
//   } catch (err) {
//     res.status(500).send("Server Error!!!");
//   }
// };

// exports.create = async (req, res) => {
//   try {
//     const category = new Category(req.body);
//     await category.save();
//     res.status(201).send({ category });
//   } catch (err) {
//     res.status(500).send("Server Error!!!");
//   }
// };

// exports.read = async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id);
//     res.status(201).send({ category });
//   } catch (err) {
//     res.status(500).send("Server Error!!!");
//   }
// };

// exports.update = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { name } = req.body;
//     const category = await Category.findByIdAndUpdate(
//       { _id: id },
//       { name: name }
//     );
//     res.status(201).send({ msg: "Category Updated Successfully" });
//   } catch (err) {
//     res.status(500).send("Server Error!!!");
//   }
// };

// exports.remove = async (req, res) => {
//   try {
//     const category = await Category.findByIdAndDelete(req.params.id);
//     res.status(201).send({ msg: "Category Deleted Successfully" });
//   } catch (err) {
//     res.status(500).send("Server Error!!!");
//   }
// };
