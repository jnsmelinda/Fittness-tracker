const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    day: Date,
    exercises: [{
        name: String,
        type: { type: String },
        weight: Number,
        sets: Number,
        reps: Number,
        duration: Number,
        distance: Number
    }]
});

module.exports = { Workout: mongoose.model("Workout", workoutSchema) };
