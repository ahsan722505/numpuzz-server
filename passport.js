const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport");
const User=require("./models/User");
const jwt=require("jsonwebtoken");
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    const user= await User.findById(profile.id);
    console.log(user);
    if(!user){
      const newUser=new User({
        username : profile.name.givenName,
        _id : profile.id
      })
      await newUser.save();
    }
    const token = jwt.sign(
              {
                username: profile.name.givenName,
                _id: profile.id
              },
              process.env.JWT_SECRET,
            );
    cb(null,token);
  }
));
