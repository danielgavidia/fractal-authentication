import express from "express";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { firebaseConfig } from "./firebase";

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
// const firebaseApp = initializeApp(firebaseConfig);
// console.log(firebaseConfig);
const firebase = require("firebase");
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// app
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// route = signup
app.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        const firebaseApp = initializeApp(firebaseConfig);
        const auth = getAuth(firebaseApp);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        res.status(200).send({ success: true, userId: user.uid, refreshToken: user.refreshToken });
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

// get current user idToken (Firebase)
// const user = firebase.auth().currentUser;
// if (user) {
//     const idToken = await user.getIdToken();
// }

// decode token (Firebase)
// const admin = require('firebase-admin');

// admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
// });

// const verifyIdToken = async (idToken) => {
//     try {
//         const decodedToken = await admin.auth().verifyIdToken(idToken);
//         return decodedToken;
//     } catch (error) {
//         throw new Error('Unauthorized');
//     }
// };

// // Example of using the verification in an Express route
// app.get('/api/user-data', async (req, res) => {
//     const idToken = req.headers.authorization.split('Bearer ')[1];

//     try {
//         const decodedToken = await verifyIdToken(idToken);
//         const userId = decodedToken.uid;

//         // Fetch user data from your database using userId
//         const userData = await getUserData(userId);
//         res.json(userData);
//     } catch (error) {
//         res.status(401).send('Unauthorized');
//     }
// });
