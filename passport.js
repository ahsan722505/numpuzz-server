const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./models/User");
const NumberRiddle = require("./models/NumberRiddle");
const jwt = require("jsonwebtoken");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      const user = await User.findById(profile.id);
      console.log(user);
      if (!user) {
        const newUser = new User({
          username: profile.name.givenName,
          _id: profile.id,
          photo: profile.photos[0].value,
        });
        const riddle = new NumberRiddle({ user_id: profile.id });
        await newUser.save();
        await riddle.save();
      }
      const token = jwt.sign(
        {
          username: profile.name.givenName,
          _id: profile.id,
          photo: profile.photos[0].value,
        },
        process.env.JWT_SECRET
      );
      cb(null, token);
    }
  )
);
