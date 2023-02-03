const { Schema, model } = require("mongoose");

const habitSchema = new Schema({
        habitName: {
            type: String,
            required: true,
        },
        frequency: {
            type: String,
            required: true,
        },
        complete: {
            type: Boolean,
            required: true
        }
    });
    

const Habit = model('habit', habitSchema);
module.exports = Habit;
