const express = require("express"),
    bodyParser = require("body-parser"),
    uuid = require("uuid");

const app = express();

app.use(bodyParser.json());

let students = [
    {
        id: 1,
        name: "Jessica Drake",
        classes: {
            biology: 95,
            algebra: 92,
        },
    },
    {
        id: 2,
        name: "Ben Cohen",
        classes: {
            biology: 95,
            algebra: 92,
        },
    },
    {
        id: 3,
        name: "Lisa Downing",
        classes: {
            biology: 95,
            algebra: 92,
        },
    },
];

// Gets the list of data about ALL students

app.get("/students", (req, res) => {
    res.json(students);
});
// Gets the data about a single student, by name

app.get("/students/:name", (req, res) => {
    res.json(
        students.find((student) => {
            return student.name === req.params.name;
        })
    );
});

// Adds data for a new student to our list of students.
app.post("/students", (req, res) => {
    let newStudent = req.body;

    if (!newStudent.name) {
        const message = "Missing name in request body";
        res.status(400).send(message);
    } else {
        newStudent.id = uuid.v4();
        students.push(newStudent);
        res.status(201).send(newStudent);
    }
});
