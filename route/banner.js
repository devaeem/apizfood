

const express = require("express");
const router = express.Router();

const {

    list,
    create,
    read,
    update,
    remove
  } = require("../controller/banner");


//@Endpoint http://localhost:5000/api/category

router.get('/banner',list)

 router.post('/banner',create)

 router.get('/banner/:id',read)

 router.put('/banner/:id',update)

 router.delete('/banner/:id',remove)




module.exports = router;