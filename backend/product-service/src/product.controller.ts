import { Request, Response } from "express";
import ProductService from "./product.service";
import logger from "./logger";

/**
 * Controller for managing products.
 */
export class ProductController {
    /**
     * Fetch all products.
     *
     * Example request: `GET /products`
     *
     * @param {Request} _req - Express request object (not used).
     * @param {Response} res - Express response object.
     * @returns {void} Sends a JSON response with a list of products.
     */
    static async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const products = await ProductService.getAll();
            logger.info(`[getAll] Fetched all products`);
            res.json(products);
        } catch (error) {
            logger.error(`[getAll] Error fetching products: ${error}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    /**
     * Get a product by ID.
     *
     * Example request: `GET /products/{id}`
     *
     * @param {Request} req - Express request object, containing the product ID.
     * @param {Response} res - Express response object.
     * @returns {void} Sends a JSON response with the product details or an error.
     */
    static async getById(req: Request, res: Response): Promise<void> {
        try {
            const product = await ProductService.getById(req.params.id);
            if (!product) {
                logger.warn(`[getById] Product not found: ${req.params.id}`);
                res.status(404).json({ error: "Product not found" });
                return;
            }
            logger.info(`[getById] Fetched product with ID: ${req.params.id}`);
            res.json(product);
        } catch (error) {
            logger.error(`[getById] Error fetching product: ${error}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    /**
     * Add a new product.
     *
     * Example request: `POST /products`
     *
     * @param {Request} req - Express request object containing the product data.
     * @param {Response} res - Express response object.
     * @returns {void} Sends a JSON response with the newly created product or an error.
     *
     * @example
     * // Request body example:
     * {
     *   "name": "Laptop",
     *   "price": 999.99,
     *   "stock": 10,
     *   "description": "A high-end gaming laptop"
     * }
     */
    static async addItem(req: Request, res: Response): Promise<void> {
        try {
            const { name, price, stock, description } = req.body;
            if (!name || typeof price !== "number" || typeof stock !== "number" || stock == null || !description) {
                logger.warn(`[addItem] Invalid product data received`);
                res.status(400).json({ error: "Missing or invalid product data" });
                return;
            }

            const newProduct = await ProductService.add({ name, price, stock, description });

            logger.info(`[addItem] New product added: ${newProduct.id}`);
            res.status(201).json(newProduct);
        } catch (error) {
            logger.error(`[addItem] Error adding product: ${error}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    /**
     * Update an existing product by ID.
     *
     * Example request: `PUT /products/{id}`
     *
     * @param {Request} req - Express request object containing the updated product data.
     * @param {Response} res - Express response object.
     * @returns {void} Sends a JSON response with the updated product or an error.
     *
     * @example
     * // Request body example:
     * {
     *   "name": "Updated Laptop",
     *   "price": 899.99,
     *   "stock": 5,
     *   "description": "An updated gaming laptop with more RAM"
     * }
     */
    static async updateItem(req: Request, res: Response): Promise<void> {
        try {
            const updatedProduct = await ProductService.update(req.params.id, req.body);
            if (!updatedProduct) {
                logger.warn(`[updateItem] Update failed. Product not found: ${req.params.id}`);
                res.status(404).json({ error: "Product not found" });
                return;
            }
            logger.info(`[updateItem] Product updated: ${req.params.id}`);
            res.json(updatedProduct);
        } catch (error) {
            logger.error(`[updateItem] Error updating product: ${error}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    /**
     * Delete a product by ID.
     *
     * Example request: `DELETE /products/{id}`
     *
     * @param {Request} req - Express request object containing the product ID.
     * @param {Response} res - Express response object.
     * @returns {void} Sends a 204 No Content response if successful, or an error message.
     */
    static async deleteItem(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await ProductService.delete(req.params.id);
            if (!deleted) {
                logger.warn(`[deleteItem] Delete failed. Product not found: ${req.params.id}`);
                res.status(404).json({ error: "Product not found" });
                return;
            }
            logger.info(`[deleteItem] Product deleted: ${req.params.id}`);
            res.status(204).send();
        } catch (error) {
            logger.error(`[deleteItem] Error deleting product: ${error}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
