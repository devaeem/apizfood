

const express = require("express");
const router = express.Router();

const {

    list,
    create,
    read,
    update,
    remove
  } = require("../controller/product");


//@Endpoint http://localhost:5000/api/category

router.get('/product',list)

 router.post('/product',create)

 router.get('/product/:id',read)

 router.put('/product/:id',update)

 router.delete('/product/:id',remove)




module.exports = router;