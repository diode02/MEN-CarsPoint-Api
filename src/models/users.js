const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../mongod/connect");

//for creating a chema AND SETTTING UP MIDDLE WARE for hashing
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id.toString() }, "juice0juice");
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

userSchema.statics.checkCradentials = async (email, password) => {
  const user = await User.findOne({ email, password });
  if (!user) throw new Error("Unable To Login 1");

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
