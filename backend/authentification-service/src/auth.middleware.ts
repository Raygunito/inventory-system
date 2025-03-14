/// <reference path="../types/types.d.ts" />
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "./logger";

class AuthMiddleware {

    public async authenticateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.header("Authorization")?.split(" ")[1];
            if (!token) {
                logger.warn("Unauthorized access attempt. No token provided.");
                res.status(401).json({ message: "Access Denied. No token provided." });
                return;
            }

            const secretKey = process.env.JWT_SECRET;
            if (!secretKey) {
                logger.error("JWT_SECRET is missing from environment variables.");
                res.status(500).json({ message: "Internal Server Error. JWT_SECRET is missing." });
                return;
            }

            // Verify token
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    logger.warn(`Invalid token from ${req.ip}. Error: ${err.message}`);
                    res.status(403).json({ message: "Invalid or expired token." });
                    return;
                }

                req.user = decoded;
                next();
            });
        } catch (error) {
            logger.error("Error in authentication middleware", error);
            res.status(500).json({ message: "Server error. Please try again later." });
        }
    }
    public authorizeAdmin(req: Request, res: Response, next: NextFunction): void {
        const user = req.user as jwt.JwtPayload;

        if (user.role !== "admin") {
            logger.warn(`Unauthorized attempt by user ${user.id} with role ${user.role} to access admin route.`);
            res.status(403).json({ message: "You do not have permission to perform this action." });
            return;
        }

        next();
    }
}

export default new AuthMiddleware();
