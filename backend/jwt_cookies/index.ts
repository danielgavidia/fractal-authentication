import { password } from "bun";
import express from "express";

// Express setup
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// app
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// 'DB'
let data = [
    { username: "daniel", password: "password_01" },
    { username: "jimmy", password: "password_02" },
    { username: "sandy", password: "password_03" },
];

// route - login (get JWT token)
app.post("/login/", (req, res) => {
    try {
        const { username, password } = req.body;

        // check if username exists
        const usernameCheck = data.map((x) => x.username).includes(username, 0);
        if (!usernameCheck) {
            res.status(400).send({ error: "Username does not exist" });
        }

        // check if password matches username
        const userObj = data.find((x) => x.username === username);
        if (userObj?.password !== password) {
            res.status(400).send({ error: "Wrong password" });
        }

        // res
        res.status(200).send({ username: username, password: password });
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

// route - sign up
