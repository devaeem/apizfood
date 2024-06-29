

const express = require("express");
const router = express.Router();

const {

    list,


  } = require("../controller/category");


//@Endpoint http://localhost:5000/api/category

router.get('/category',list)

// router.post('/category',auth,admin,create)

// router.get('/category/:id',auth,admin,read)

// router.put('/category/:id',auth,admin,update)

// router.delete('/category/:id',auth,admin,remove)




module.exports = router;