import express from "express";
import ProductController from "./product.controller";

const router = express.Router();

router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);

router.post("/", ProductController.addItem);
router.put("/:id", ProductController.updateItem);
router.delete("/:id", ProductController.deleteItem);

export default router;