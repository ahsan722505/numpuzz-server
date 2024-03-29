require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
require("./passport");
const authRoutes = require("./routes/auth");
const numberRiddleRoutes = require("./routes/numberRiddle");

const app = express();
app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use("/heartbeat", (req, res) => {
  res.status(200).json({ message: "I'm alive" });
});
app.use("/auth", authRoutes);
app.use("/numberRiddle", numberRiddleRoutes);

app.use((error, req, res, next) => {
  // console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});
const port = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`App started on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
