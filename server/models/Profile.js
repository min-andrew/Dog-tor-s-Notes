const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  petName: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: String,
  },
  breed: {
    type: String,
    required: true,
  },
  foodBrand: {
    type: String,
    required: true,
  },
  humanName: {
    type: String,
    required: true,
  },
});

const Profile = model("profile", profileSchema);

module.exports = Profile;
