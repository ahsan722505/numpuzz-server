const express = require('express');
const isAuth = require('../middlewares/is-auth');
const passport=require("passport");

const router = express.Router();
const CLIENT_URL="http://localhost:3000";

router.get("/getStatus",isAuth,(req,res)=>{
res.status(200).json({username : req.username})
})

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
passport.authenticate("google", {
  failureRedirect: CLIENT_URL,
  session : false
}),(req,res)=>{
  res.cookie("token",`${req.user}`);
  res.redirect(CLIENT_URL);
});



module.exports = router;
