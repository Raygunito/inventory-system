import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./product.routes";
import logger from "./logger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use((req, _res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use("/api/products", router);

app.get("/", (_req, res) => {
    res.send("Product Service is running");
});

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});