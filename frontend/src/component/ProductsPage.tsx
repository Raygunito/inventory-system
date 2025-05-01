import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import Product from "../product.type";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("");
  const baseEndpoint = import.meta.env.VITE_ACCOUNT_ENDPOINT ?? "";
  const endpoint = "api/products";
  useEffect(() => {
    fetch(baseEndpoint + endpoint)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message));
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-primary">Products</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4 flex gap-2">
        <label className="text-sm font-medium text-text">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-2 py-1 text-sm bg-background text-text border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Default</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-text">No products available.</p>
        )}
      </div>
    </main>
  );
};

export default ProductsPage;
