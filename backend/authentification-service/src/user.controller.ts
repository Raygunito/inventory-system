import { Request, Response } from "express";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "./db";
import logger from "./logger";
import { v4 as uuidv4 } from "uuid";

class UserController {
    public async changePassword(req: Request, res: Response): Promise<void> {
        const { oldPassword, newPassword } = req.body;
        const userId = (req.user as jwt.JwtPayload).id;
        if (!oldPassword || !newPassword) {
            res.status(400).json({ message: "Both current and new passwords are required" });
            return;
        }
        try {
            const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [userId]);

            if (!user) {
                logger.warn(`Change password failed: User with ID ${userId} not found.`);
                res.status(404).json({ message: "User not found" });
                return;
            }

            const passwordMatch = await compare(oldPassword, user.password);

            if (!passwordMatch) {
                logger.warn(`Change password failed: Incorrect old password for user ${userId}.`);
                res.status(401).json({ message: "Incorrect old password" });
                return;
            }

            const hashedPassword = await hash(newPassword, 10);
            await db.none('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);
            logger.info(`Password changed successfully for user ${userId}.`);
            res.status(200).json({ message: "Password changed successfully" });
        } catch (error) {
            logger.error("Error changing password", error);
            res.status(500).json({ message: "Internal server error" });
        }

    }
    public async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        try {
            const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);

            if (!user) {
                logger.warn(`Login failed: User with username ${username} not found.`);
                res.status(401).json({ message: "Invalid username or password" });
                return;
            }

            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                logger.warn(`Login failed: Incorrect password for user ${username}.`);
                res.status(401).json({ message: "Invalid username or password" });
                return;
            }

            const secretKey = process.env.JWT_SECRET;
            if (!secretKey) {
                logger.error('JWT_SECRET is missing from environment variables.');
                res.status(500).json({ message: 'Internal Server Error. JWT_SECRET is missing.' });
                return;
            }

            const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: "1h" });
            logger.info(`Login successful for user ${username}. Token generated.`);
            res.status(200).json({ token });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public async register(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        try {
            const existingUser = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);

            if (existingUser) {
                logger.warn(`Registration failed: Username ${username} is already taken.`);
                res.status(400).json({ message: "Username is already taken" });
                return;
            }

            const userId = uuidv4();
            const hashedPassword = await hash(password, 10);

            await db.none('INSERT INTO users (id, username, password, role) VALUES ($1, $2, $3, $4)', [userId, username, hashedPassword, "client"]);
            logger.info(`User ${username} registered successfully.`);
            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            logger.error("Error during user registration", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public async logout(req: Request, res: Response): Promise<void> {
        // handled on the client side by deleting the token
        res.status(200).json({ message: "Logged out successfully" });
    }

    public async dashboard(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req.user as jwt.JwtPayload).id;
            logger.info(`Fetching dashboard for user ID: ${userId}`);
            const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [userId]);

            if (!user) {
                logger.warn(`User not found with ID: ${userId}`);
                res.status(404).json({ message: "User not found" });
                return;
            }
            const users = await db.any('SELECT id, username, role FROM users');

            if (!users || users.length === 0) {
                logger.warn("No users found in the database.");
                res.status(404).json({ message: "No users found" });
                return;
            }
            logger.info(`Fetched user list for dashboard.`);
            res.status(200).json({ users, username: user.username, role: user.role });
        } catch (error) {
            logger.error("Error fetching user dashboard", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public async updateRole(req: Request, res: Response): Promise<void> {
        const { userId, newRole } = req.body;

        try {
            const validRoles = ["admin", "client", "manager"];
            if (!validRoles.includes(newRole)) {
                logger.warn(`Update role failed: Invalid role ${newRole}.`);
                res.status(400).json({ message: "Invalid role" });
                return;
            }

            const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [userId]);

            if (!user) {
                logger.warn(`Update role failed: User with ID ${userId} not found.`);
                res.status(404).json({ message: "User not found" });
                return;
            }

            await db.none('UPDATE users SET role = $1 WHERE id = $2', [newRole, userId]);
            logger.info(`User ${userId} role updated to ${newRole}.`);
            res.status(200).json({ message: "User role updated successfully" });
        } catch (error) {
            logger.error("Error updating user role", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        const { userId } = req.body;

        try {
            const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [userId]);

            if (!user) {
                logger.warn(`Delete failed: User with ID ${userId} not found.`);
                res.status(404).json({ message: "User not found" });
                return;
            }

            await db.none('DELETE FROM users WHERE id = $1', [userId]);
            logger.info(`User ${userId} deleted successfully.`);
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            logger.error("Error deleting user", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default new UserController();
