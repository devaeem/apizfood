

const express = require("express");
const router = express.Router();

const {

    list,
    create,
    read,
    update,
    remove,
    removeImage,
    random
  } = require("../controller/product");

  const { auth} = require("../middleware/auth")
//@Endpoint http://localhost:5000/api/category

router.get('/product',list)

router.get('/productrandom',random)

 router.post('/product',auth,create)

 router.get('/product/:id',read)

 router.put('/product/:id',auth,update)

 router.delete('/product/:id',remove)
 router.delete('/productdeleteimage/:id',auth,removeImage)



module.exports = router;