import express from "express";
import { verifyFirebaseToken } from "./middleware";
import prisma from "../prisma/prisma";

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
app.post("/login", verifyFirebaseToken, async (req, res) => {
    const firebaseId = req.body.firebaseId;
    const user = await prisma.user.findUnique({
        where: {
            firebaseId: firebaseId,
        },
    });
    if (!user) {
        const userNew = await prisma.user.create({
            data: {
                firebaseId: firebaseId,
            },
        });
        res.status(200).json(userNew);
    }
    res.status(200).json(user);
});

// sign up
