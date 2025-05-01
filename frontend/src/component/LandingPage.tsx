import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-text px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-text text-center">
        Welcome to Inventory System
      </h1>
      <p className="text-lg sm:text-xl text-secondary mt-2 text-center">
        Track, Organize, Enhance
      </p>

      <Link
        to="/products"
        className="mt-6 px-6 py-3 bg-primary text-text text-lg font-semibold rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
      >
        View Products
      </Link>
    </main>
  );
};

export default LandingPage;
