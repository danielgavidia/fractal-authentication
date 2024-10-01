import express from "express";
import admin from "firebase-admin";

// Express setup
const app = express();
const port = 4000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Firebase setup
const serviceAccount = require("./credentials.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// app
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/authenticate", async (req, res) => {
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) {
        res.status(401).send("No token provided");
        return;
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        res.status(200).send(decodedToken);
    } catch (error) {
        res.status(400).send("Unauthorized: " + error);
    }
    res.send("Test");
});
