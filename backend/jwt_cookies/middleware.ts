import { verify } from "jsonwebtoken";
import type { RequestHandler } from "express";
import type { JwtPayload } from "jsonwebtoken";

export const key = process.env.KEY_JWT_COOKIES || "KEY_FALLBACK";

export const authenticate: RequestHandler = async (req, res, next) => {
    try {
        // Get auth token
        const token = req.headers.authorization?.split(" ")[1];

        // If token does not exist, return error
        if (!token) {
            res.status(400).json({ message: "Unauthorized" });
            return;
        }

        // Decode token and transform into decoded object (AI helped with type issue)
        const decoded = verify(token, key);
        let userId: string | undefined;

        // Check if decoded is a JwtPayload (AI helped with type issue)
        if (typeof decoded !== "string" && (decoded as JwtPayload).userId) {
            userId = (decoded as JwtPayload).userId;
        }

        // Append userId to req body
        req.body = {
            userId: userId,
        };

        // Next
        next();
    } catch (error) {
        res.status(400).json({ error: error });
    }
};
