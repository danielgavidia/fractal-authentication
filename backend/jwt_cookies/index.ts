import express from "express";
import { authenticate } from "./middleware";
import { v4 as uuidv4 } from "uuid";

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
    {
        userId: "1",
        username: "daniel",
        password: "password_01",
        email: "daniel@gmail.com",
        address: "123 Daniel St.",
    },
    {
        userId: "2",
        username: "jimmy",
        password: "password_02",
        email: "jimmy@gmail.com",
        address: "123 Jimmy St.",
    },
    {
        userId: "3",
        username: "sandy",
        password: "password_03",
        email: "sandy@gmail.com",
        address: "123 Sandy St.",
    },
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
        const userId = userObj?.userId;

        // generate JWT using username, password, and KEY_JWT_COOKIES
        const token = jwt.sign(
            {
                userId: userId,
                password: password,
            },
            process.env.KEY_JWT_COOKIES,
            { expiresIn: "1hr" }
        );

        // res
        res.status(200).send({ token: token });
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

// route - sign up
app.post("/signup/", (req, res) => {
    try {
        const { username, password, email, address } = req.body;

        // check if username already exists
        const usernameCheck = data.map((x) => x.username).includes(username, 0);
        if (usernameCheck) {
            res.status(400).send({ error: "Username already exists" });
        }
        // generate userId
        const newUser = {
            userId: uuidv4(),
            username: username,
            password: password,
            email: email,
            address: address,
        };

        // send new user Object to data Object
        data.push(newUser);
        console.log(data);

        // generate JWT using username, password, and KEY_JWT_COOKIES
        const token = jwt.sign(
            {
                userId: newUser.userId,
                password: password,
            },
            process.env.KEY_JWT_COOKIES,
            { expiresIn: "1hr" }
        );

        // res
        res.status(200).send({ token: token });
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

// route - authorization
app.get("/authenticated/", authenticate, (req, res) => {
    try {
        const userId = req.body.userId;
        const username = data.find((x) => x.userId === userId)?.username;
        // res
        res.status(200).send(`${username} is authenticated`);
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

// route - get user data
app.get("/user/", authenticate, (req, res) => {
    try {
        const userId = req.body.userId;
        const userObj = data.find((x) => x.userId === userId);
        // res
        res.status(200).send({
            username: userObj?.username,
            email: userObj?.email,
            address: userObj?.address,
        });
    } catch (error) {
        res.status(400).send({ error: error });
    }
});
