import Product from "../product.type";
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-background border border-primary rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-bold text-primary">{product.name}</h3>
      <p className="text-text">Price: ${product.price}</p>
      <p className="text-text">Stock: {product.stock}</p>
      <p className="text-secondary">{product.description}</p>
    </div>
  );
};

export default ProductCard;
