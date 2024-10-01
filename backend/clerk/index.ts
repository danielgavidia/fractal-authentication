import express from "express";
// import { authenticate, clerkTokenAuthMiddleware } from "./middleware";
import {
    clerkClient,
    clerkMiddleware,
    createClerkClient,
    getAuth,
    requireAuth,
} from "@clerk/express";

console.log(process.env.CLERK_PUBLISHABLE_KEY, process.env.CLERK_SECRET_KEY);

// Express setup
const app = express();
const port = 3000;
const cors = require("cors");

console.log();

// const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// const clerkOptions = {
//     clerkClient,
// };

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Add a protected route
app.get("/authenticated/", requireAuth(), async (req, res) => {
    const { userId } = getAuth(req);
    const user = await clerkClient.users.getUser(userId);
    console.log(userId, user);
    // const users = await clerkClient.users.getUserList();
    console.log("I'm in the authenticated required auth section");
    try {
        const userId = req.body.userId;
        // console.log(userId);

        // res
        res.status(200).send({
            userId: userId,
        });
    } catch (error) {
        res.status(400).send({ error: error });
    }
});
