

const express = require("express");
const router = express.Router();

const {

    list,
    create,
    read,
    update,
    remove
  } = require("../controller/category");


//@Endpoint http://localhost:5000/api/category

router.get('/category',list)

 router.post('/category',create)

 router.get('/category/:id',read)

 router.put('/category/:id',update)

 router.delete('/category/:id',remove)




module.exports = router;