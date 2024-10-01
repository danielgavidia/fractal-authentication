import admin from "firebase-admin";
import type { RequestHandler } from "express";

const serviceAccount = require("./credentials.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const verifyFirebaseToken: RequestHandler = async (req, res, next) => {
    const idToken = req.headers.authorization?.split("Bearer ")[1];

    if (!idToken) {
        res.status(400).json({ message: "No token provided" });
        return;
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const firebaseId = decodedToken.uid;
        const email = decodedToken.email;
        req.body = {
            idToken: idToken,
            firebaseId: firebaseId,
            email: email,
        };
        next();
    } catch (error) {
        res.status(400).send("Unauthorized: " + error);
    }
};
