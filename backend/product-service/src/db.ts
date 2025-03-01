import pgPromise from "pg-promise";
import fs from "fs";
import path from "path";
import logger from "./logger";

const pgp = pgPromise();

const db = pgp({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "inventory_system",
    password: process.env.DB_PASSWORD || "postgres",
    port: Number(process.env.DB_PORT) || 5432,
});

async function initializeDatabase() {
    try {
        const fillSql = fs.readFileSync(path.join(__dirname, "../sql/fill.sql"), "utf8");
        await db.none(fillSql);
        logger.info("Database filled successfully.");
    } catch (error) {
        logger.error("Error initializing or filling database:", error);
    }
}

initializeDatabase();

export default db;
