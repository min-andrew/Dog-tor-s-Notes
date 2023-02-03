const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const vetSchema = new Schema(
  {
    petName: {
      type: String,
      required: true,
      trim: true
    },
    appointmentDate: {
      type: String,
      required: true,
      trim: true
    },
    primaryConcern: {
      type: String,
      required: true,
      trim: true
    },
    // May change if we decide this will be a date feature. Revisit.
    onsetDate: {
      type: String
    },
    otherConcerns: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    // Not sure what other schemas will be, but this next one will just link the form to the profile of the appropriate pet. Will figure out what data to link once the profile is set up.
  }
);

const VetNote = model('vetNote', vetSchema);

module.exports = VetNote;
