const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

  username: {
    type: String,
    required: true
  },
  _id : Number,
  
});

module.exports = mongoose.model('User', userSchema);
