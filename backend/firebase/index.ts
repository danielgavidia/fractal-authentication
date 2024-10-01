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
    const { idToken, firebaseId, email } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            firebaseId: firebaseId,
        },
    });
    if (!user) {
        const userNew = await prisma.user.create({
            data: {
                firebaseId: firebaseId,
                email: email,
            },
        });
        res.status(200).json({ idToken: idToken });
    }
    res.status(200).json({ idToken: idToken });
});

// sign up
app.post("/signup", verifyFirebaseToken, async (req, res) => {
    const { idToken, firebaseId, email } = req.body;
    const user = {
        firebaseId: firebaseId,
        email: email,
    };
    const userNew = await prisma.user.create({
        data: user,
    });
    res.status(200).json({ idToken: idToken });
});

// get users
app.post("/user", verifyFirebaseToken, async (req, res) => {
    const { idToken, firebaseId } = req.body;
    console.log(idToken);
    const user = await prisma.user.findUnique({
        where: {
            firebaseId: firebaseId,
        },
    });
    const userData = {
        idToken: idToken,
        email: user?.email,
    };
    res.status(200).json(userData);
});
