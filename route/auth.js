const express = require("express");
const router = express.Router();

const { auth } = require("../controller/auth");

//@Endpoint http://localhost:5000/api/category

router.post("/login", auth);

module.exports = router;
