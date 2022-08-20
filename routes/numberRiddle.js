const express = require('express');
const isAuth = require('../middlewares/is-auth');
const Controllers=require("../controllers/numberRiddle");

const router = express.Router();


router.get("/getBest",isAuth,Controllers.getBest);
router.post("/setBest",isAuth,Controllers.setBest);
router.get("/getTop/:size",isAuth,Controllers.getTop)




module.exports = router;
