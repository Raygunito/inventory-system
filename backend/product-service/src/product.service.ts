import db from "./db";
import { Product } from "./product.model";

const ProductService = {
    getAll: async (): Promise<Product[]> => {
        return db.any("SELECT * FROM products");
    },

    getById: async (id: string): Promise<Product | null> => {
        return db.oneOrNone("SELECT * FROM products WHERE id = $1", [id]);
    },

    add: async (product: Omit<Product, "id">): Promise<Product> => {
        return db.one(
            "INSERT INTO products (name, price, stock, description) VALUES ($1, $2, $3, $4) RETURNING *",
            [product.name, product.price, product.stock, product.description]
        );
    },

    update: async (id: string, updatedProduct: Partial<Product>): Promise<Product | null> => {
        return db.oneOrNone(
            `UPDATE products 
       SET name = COALESCE($2, name), 
           price = COALESCE($3, price), 
           stock = COALESCE($4, stock), 
           description = COALESCE($5, description) 
       WHERE id = $1 RETURNING *`,
            [id, updatedProduct.name, updatedProduct.price, updatedProduct.stock, updatedProduct.description]
        );
    },

    delete: async (id: string): Promise<boolean> => {
        const result = await db.result("DELETE FROM products WHERE id = $1", [id]);
        return result.rowCount > 0;
    },
};

export default ProductService;
