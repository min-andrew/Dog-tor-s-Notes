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
  microchip: {
    type: String,
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

const Profile = model("Profile", profileSchema);

module.exports = Profile;
