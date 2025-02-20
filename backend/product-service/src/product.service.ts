import { Product } from "./product.model";

const products: Product[] = [
    { id: "1", name: "Clavier mécanique", price: 99.99, stock: 10, description: "Clavier mécanique RGB avec switches rouges" },
    { id: "2", name: "Souris gaming", price: 49.99, stock: 15, description: "Souris ergonomique avec capteur 16000 DPI" },
];

const ProductService = {
    getAll: (): Product[] => {
        return products;
    },

    getById: (id: string): Product | undefined => {
        return products.find((p) => p.id === id);
    },

    add: (product: Product): Product => {
        products.push(product);
        return product;
    },

    update: (id: string, updatedProduct: Partial<Product>): Product | null => {
        const index = products.findIndex((p) => p.id === id);
        if (index === -1) return null;

        products[index] = { ...products[index], ...updatedProduct };
        return products[index];
    },

    delete: (id: string): boolean => {
        const initialLength = products.length;
        const filteredProducts = products.filter((p) => p.id !== id);

        // Only modify 'products' if a product was actually removed
        if (filteredProducts.length < initialLength) {
            products.length = 0;
            products.push(...filteredProducts);
            return true;
        }
        return false;
    }
};

export default ProductService;
