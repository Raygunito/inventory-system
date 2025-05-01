import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../component/AuthContext";

const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseEndpoint = import.meta.env.VITE_ACCOUNT_ENDPOINT ?? "";

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!username || !password) {
      setMessage("Username and password are required.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    const endpoint = isLogin ? "auth/login" : "auth/register";
    const payload = { username, password };

    setLoading(true);

    try {
      const response = await fetch(baseEndpoint + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem("token", data.token);
          login(data.token);
          setMessage("Login successful! Redirecting...");
  
        } else {
          setMessage(data.message || "Registration successful!");
          localStorage.setItem("token", data.token);
          login(data.token);
        }
  
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
        
      } else {
        setMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto p-6 bg-background text-text rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-text mb-4">
        {isLogin ? "Login" : "Register"}
      </h1>

      <button
        className="text-sm text-primary underline hover:text-secondary transition-colors duration-200 cursor-pointer"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Create an account" : "Already have an account? Login"}
      </button>

      {message && <p className="mt-3 text-sm text-red-500">{message}</p>}

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-text">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mt-1 rounded-md bg-background border border-primary"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-text">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 rounded-md bg-background border border-primary"
            placeholder="Enter your password"
          />
        </div>

        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 mt-1 rounded-md bg-background border border-primary"
              placeholder="Confirm your password"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-primary text-text rounded-md cursor-pointer disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Processing..." : isLogin ? "Login" : "Register"}
        </button>
      </form>
    </main>
  );
};

export default AccountPage;
