import { useState } from "react";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
    }

    // Proceed with login or registration logic here (e.g., API call)
    console.log("Form submitted", { username, password });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-background text-text rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-text mb-4">
        {isLogin ? "Login" : "Register"}
      </h2>

      <button
        className="text-sm text-primary underline hover:text-secondary transition-colors duration-200 cursor-pointer"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Create an account" : "Already have an account? Login"}
      </button>

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-text"
          >
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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-text"
          >
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
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-text"
            >
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
          className="w-full py-2 bg-primary text-text rounded-md cursor-pointer"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AccountPage;
