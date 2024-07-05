

const express = require("express");
const router = express.Router();

const {

    list,
    create,
    read,
    update,
    remove
  } = require("../controller/banner");
  const { auth} = require("../middleware/auth")

//@Endpoint http://localhost:5000/api/category

router.get('/banner',list)

 router.post('/banner',auth,create)

 router.get('/banner/:id',read)

 router.put('/banner/:id',auth,update)

 router.delete('/banner/:id',auth,remove)




module.exports = router;