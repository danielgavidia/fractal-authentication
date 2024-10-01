import { verify } from "jsonwebtoken";
import type { Request, RequestHandler } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { createClerkClient } from "@clerk/backend";

export const key = process.env.CLERK_SECRET_KEY;
if (!key) throw Error("CLERK API KEY DOES NOT EXIST");

// headers: {"Authorization": "Bearer <token>""}
export const clerkTokenAuthMiddleware: RequestHandler = async (req: Request, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    // If token does not exist, return error
    if (!token) {
        res.status(400).json({ message: "Unauthorized" });
        return;
    }

    console.log("test");

    const clerkClient = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY,
        publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    });

    console.log("test2");

    const { isSignedIn } = await clerkClient.authenticateRequest(req, {
        authorizedParties: ["http://localhost:3000", "http://localhost:5173"],
    });

    console.log("test3");

    console.log(isSignedIn);

    // Next
    next();
};
