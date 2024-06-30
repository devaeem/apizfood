

const express = require("express");
const router = express.Router();

const {

    list,
    create,
    read,
    update,
    remove
  } = require("../controller/users");

router.get('/users',list)

 router.post('/users',create)

 router.get('/users/:id',read)

 router.put('/users/:id',update)

 router.delete('/users/:id',remove)




module.exports = router;