const express = require("express");
const morgan = require('morgan')
const path = require("path");
const mongoose = require("mongoose");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(workouts => res.json(workouts.map(enhanceWithTotalDuration)))
        .catch(err => res.json(err));
})

function enhanceWithTotalDuration(workout) {
    workout = workout.toJSON();
    let totalDuration = 0;
    for (let i = 0; i < workout.exercises.length; i++) {
        totalDuration += workout.exercises[i].duration;
    }
    workout.totalDuration = totalDuration;

    return workout;
}

app.get("/exercise", (req, res) => res.sendFile(path.join(__dirname, "public/exercise.html")));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

app.listen(PORT, () => console.log("App listening on PORT: " + PORT));
