const mongoose = require("mongoose");
const { Schema } = mongoose;


const commentSchema = new mongoose.Schema({
  organization: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Comment", commentSchema);