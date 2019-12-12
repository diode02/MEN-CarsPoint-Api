const mongoose = require("mongoose");

//for creating a schema AND SETTTING UP MIDDLE WARE for hashing
const newSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  make: {
    type: Number,
    required: true
  },
  numPlate: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  color: {
    type: String,
    default: "NA"
  },
  company: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
});
newSchema.statics.findSameModel = function(ma) {
  return this.find({ make: ma });
};
newSchema.statics.findSameName = function(ma) {
  return this.find({ name: ma });
};
newSchema.statics.findSameCompany = function(ma) {
  return this.find({ company: ma });
};
newSchema.statics.findSameColor = function(ma) {
  return this.find({ color: ma });
};
newSchema.statics.findSamePrice = function(ma) {
  return this.find({ price: ma });
};
const Cars = mongoose.model("Cars", newSchema);

module.exports = Cars;
