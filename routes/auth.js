const express = require("express");
const isAuth = require("../middlewares/is-auth");
const passport = require("passport");

const router = express.Router();
const CLIENT_URL = "http://localhost:3000";

router.get("/getStatus", isAuth, (req, res) => {
  res.status(200).json({ username: req.username, photo: req.photo });
});

router.get("/google", (req, res, next) => {
  const { returnTo } = req.query;
  const state = Buffer.from(JSON.stringify({ returnTo })).toString("base64");
  const authenticator = passport.authenticate("google", {
    scope: ["profile"],
    state,
  });
  authenticator(req, res, next);
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: CLIENT_URL,
    session: false,
  }),
  (req, res) => {
    const { state } = req.query;
    const { returnTo } = JSON.parse(Buffer.from(state, "base64").toString());
    res.redirect(`http://${returnTo}/login-success?token=${req.user}`);
  }
);
router.get("/facebook", (req, res, next) => {
  const { returnTo } = req.query;
  const state = Buffer.from(JSON.stringify({ returnTo })).toString("base64");
  const authenticator = passport.authenticate("facebook", {
    state,
  });
  authenticator(req, res, next);
});
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: CLIENT_URL,
    session: false,
  }),
  (req, res) => {
    const { state } = req.query;
    const { returnTo } = JSON.parse(Buffer.from(state, "base64").toString());
    res.redirect(`http://${returnTo}/login-success?token=${req.user}`);
  }
);

module.exports = router;
