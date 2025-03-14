import bcrypt from "bcryptjs";
import pgPromise from "pg-promise";
import logger from "./logger";
import { v4 as uuidv4 } from 'uuid';

const pgp = pgPromise();
const db = pgp({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "inventory_system",
    password: process.env.DB_PASSWORD || "postgres",
    port: Number(process.env.DB_PORT) || 5432,
});

async function createDefaultAdmin(): Promise<void> {
    const adminUsername = "admin";
    const adminPassword = "admin";

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const adminId = uuidv4();

    try {
        // Check if the admin user already exists
        const existingAdmin = await db.oneOrNone(
            'SELECT id FROM users WHERE username = $1',
            [adminUsername]
        );

        if (existingAdmin) {
            logger.info("Admin user already exists.");
            return;
        }

        await db.none(
            `INSERT INTO users (id, username, password, role)
             VALUES ($1, $2, $3, $4)`,
            [adminId, adminUsername, hashedPassword, "admin"]
        );

        logger.info("Admin user added successfully.");
    } catch (error) {
        logger.error("Error adding admin user:", error);
    }
};

createDefaultAdmin().catch(err => console.error("Failed to create admin:", err));

export default db;
