const express = require("express");
const morgan = require('morgan')
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("combined"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get("/exercise", (req, res) => res.sendFile(path.join(__dirname, "public/exercise.html")));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

app.listen(PORT, () => console.log("App listening on PORT: " + PORT));
