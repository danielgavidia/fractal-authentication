import express from "express";

// Express setup
const app = express();
const port = 3000;
const cors = require("cors");
const jwt = require("jsonwebtoken");

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
    { id: 1, username: "daniel", password: "password_01" },
    { id: 2, username: "jimmy", password: "password_02" },
    { id: 3, username: "sandy", password: "password_03" },
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

        // get user id
        const userId = userObj?.id;

        // create JWT using username, password, and KEY_JWT_COOKIES
        const token = jwt.sign(
            {
                userId: userId,
                password: password,
            },
            "test",
            { expiresIn: "1hr" }
        );

        // res
        res.status(200).send({ userId: userId, token: token });
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

// route - sign up
