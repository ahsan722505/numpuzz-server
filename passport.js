const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
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
    handleData
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "name", "picture", "email"],
    },
    handleData
  )
);
async function handleData(_, _, profile, cb) {
  console.log(profile);
  const user = await User.findById(profile.id);
  if (!user) {
    const newUser = new User({
      username: profile.name.givenName,
      _id: profile.id,
      photo: profile.photos[0].value,
      email: profile.emails[0].value,
    });
    const riddle = new NumberRiddle({ user_id: profile.id });
    await newUser.save();
    await riddle.save();
  } else if (!user.email) {
    await User.updateOne(
      { _id: profile.id },
      { email: profile.emails[0].value }
    );
  }
  const token = jwt.sign(
    {
      username: profile.name.givenName,
      _id: profile.id,
      photo: profile.photos[0].value,
      email: profile.emails[0].value,
    },
    process.env.JWT_SECRET
  );
  cb(null, token);
}
