const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Your first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Your last name is required"],
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  userName: {
    type: String,
    required: [true, "Your username is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Your phone number is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model('User', userSchema);