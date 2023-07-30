const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  _id: Number,
  photo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
