import pgPromise from "pg-promise";
import fs from "fs";
import path from "path";
import logger from "./logger";

const pgp = pgPromise();

const db = pgp({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "products",
    password: process.env.DB_PASSWORD || "postgres",
    port: Number(process.env.DB_PORT) || 5432,
});

const initSql = fs.readFileSync(path.join(__dirname, "../sql/init.sql"), "utf8");

db.none(initSql)
    .then(() => logger.info("Database initialized successfully"))
    .catch((err) => logger.error("Error initializing database:", err));

async function initializeDatabase() {
    try {
        const sql = fs.readFileSync(path.join(__dirname, "../sql/fill.sql"), "utf-8");
        await db.none(sql);
        logger.info("Database filled successfully.");
    } catch (error) {
        logger.error("Error filling database:", error);
    }
}

initializeDatabase();

export default db;
