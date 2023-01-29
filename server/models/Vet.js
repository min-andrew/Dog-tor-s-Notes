const { Schema, model } = require('mongoose');

const vetSchema = new Schema(
  {
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
    symptoms: {
        type: String,
        required: true
    },
    // Not sure what other schemas will be, but this next one will just link the form to the profile of the appropriate pet. Will figure out what data to link once the profile is set up.
    profile: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
      }
    ]
  }
);

const VetNotes = model('vet', vetSchema);

module.exports = VetNotes;
