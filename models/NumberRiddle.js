const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const numberRiddleSchema = new Schema({

  best : {
        3 : {
            m : Number,
            d : String
        },
        4 : {
            m : Number,
            d : String
            },
        5 : {
            m : Number,
            d : String
        },
        6 : {
            m : Number,
            d : String
        },
        7 : {
            m : Number,
            d : String
        },
        8 : {
            m : Number,
            d : String
        },
  },
  user_id : Number,
  
});

module.exports = mongoose.model('NumberRiddle', numberRiddleSchema);
