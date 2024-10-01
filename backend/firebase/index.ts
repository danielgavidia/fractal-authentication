import express from "express";
import { verifyFirebaseToken } from "./middleware";

// Express setup
const app = express();
const port = 4000;
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

// authenticate
app.post("/authenticate", verifyFirebaseToken, (req, res) => {
    const firebaseId = req.body.firebaseId;
    res.status(200).json({ firebaseId: firebaseId });
});

// log in
app.post("/login", verifyFirebaseToken, (req, res) => {
    const firebaseId = req.body.firebaseId;
});

// sign up
