

const express = require("express");
const router = express.Router();

const {

    list,
    create,
    read,
    update,
    remove
  } = require("../controller/category");

  const { auth} = require("../middleware/auth")

//@Endpoint http://localhost:5000/api/category

router.get('/category',list)

 router.post('/category',auth,create)

 router.get('/category/:id',read)

 router.put('/category/:id',auth,update)

 router.delete('/category/:id',auth,remove)




module.exports = router;