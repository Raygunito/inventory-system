import { Request, Response } from "express";
import ProductService from "./product.service";
import logger from "./logger";

class ProductController {
    static getAll(_req: Request, res: Response) {
        try {
            const products = ProductService.getAll();
            logger.info(`[getAll] Fetched all products`);
            res.json(products);
        } catch (error) {
            logger.error(`[getAll] Error fetching products: ${error}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static getById(req: Request, res: Response) {
        try {
            const product = ProductService.getById(req.params.id);
            if (!product) {
                logger.warn(`[getById] Product not found: ${req.params.id}`);
                return res.status(404).json({ error: "Product not found" });
            }
            logger.info(`[getById] Fetched product with ID: ${req.params.id}`);
            res.json(product);
        } catch (error) {
            logger.error(`[getById] Error fetching product: ${error}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static addItem(req: Request, res: Response) {
        try {
            const { name, price, stock, description } = req.body;
            if (!name || typeof price !== "number" || typeof stock !== "number" || stock == null || !description) {
                logger.warn(`[addItem] Invalid product data received`);
                return res.status(400).json({ error: "Missing or invalid product data" });
            }

            const newProduct = ProductService.add({
                id: Math.random().toString(36).substr(2, 9),
                name,
                price,
                stock,
                description,
            });

            logger.info(`[addItem] New product added: ${newProduct.id}`);
            return res.status(201).json(newProduct);
        } catch (error) {
            logger.error(`[addItem] Error adding product: ${error}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static updateItem(req: Request, res: Response) {
        try {
            const updatedProduct = ProductService.update(req.params.id, req.body);
            if (!updatedProduct) {
                logger.warn(`[updateItem] Update failed. Product not found: ${req.params.id}`);
                return res.status(404).json({ error: "Product not found" });
            }
            logger.info(`[updateItem] Product updated: ${req.params.id}`);
            res.json(updatedProduct);
        } catch (error) {
            logger.error(`[updateItem] Error updating product: ${error}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static deleteItem(req: Request, res: Response) {
        try {
            const deleted = ProductService.delete(req.params.id);
            if (!deleted) {
                logger.warn(`[deleteItem] Delete failed. Product not found: ${req.params.id}`);
                return res.status(404).json({ error: "Product not found" });
            }
            logger.info(`[deleteItem] Product deleted: ${req.params.id}`);
            res.status(204).send();
        } catch (error) {
            logger.error(`[deleteItem] Error deleting product: ${error}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default ProductController;
