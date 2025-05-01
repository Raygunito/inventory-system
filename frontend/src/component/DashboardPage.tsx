import { useEffect, useState } from "react";
import Product from "../product.type";

interface User {
  id: string;
  username: string;
  role: "admin" | "manager" | "client";
}

const baseEndpoint = import.meta.env.VITE_DASHBOARD_ENDPOINT ?? "";

// Fetch dashboard data
const fetchDashboardData = async (): Promise<{
  users: User[];
  username: string;
  role: User["role"];
}> => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseEndpoint + "/auth/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch dashboard");
  return res.json();
};

const fetchProductsData = async (): Promise<Product[]> => {
  const res = await fetch(baseEndpoint + "/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<string> => {
  const token = localStorage.getItem("token");
  const res = await fetch(baseEndpoint + "/user/changePassword", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      oldPassword: currentPassword,
      newPassword,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Password change failed");
  return "Password changed successfully!";
};

const updateProductStock = async (product: Product): Promise<void> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${baseEndpoint}/api/products/${product.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Failed to update stock");
  }
};

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await fetchDashboardData();
        setUsers(data.users);

        const currentUser = data.users.find(
          (u) => u.username === data.username
        );
        setUser({
          id: currentUser?.id ?? "",
          username: data.username,
          role: data.role,
        });
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  useEffect(() => {
    if (user?.role === "admin" || user?.role === "manager") {
      fetchProductsData()
        .then(setProducts)
        .catch((e) => console.error("Error loading products:", e));
    }
  }, [user]);

  const handlePasswordChange = async () => {
    setMessage("");
    try {
      const msg = await changePassword(currentPassword, newPassword);
      setMessage(msg);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setMessage(err.message || "Something went wrong");
    }
  };

  const handleStockUpdate = async (product: Product) => {
    try {
      await updateProductStock(product);
      alert("Stock updated successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to update stock.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-primary">Dashboard</h1>

      {/* Profile Section */}
      <section className="my-6">
        <h2 className="text-xl font-semibold mb-1">Profile</h2>
        <p className="text-lg mb-2">Username: {user?.username}</p>

        <div className="max-w-md border p-2 rounded">
          <label className="block mb-1 font-medium">Current Password</label>
          <input
            type="password"
            className="border p-1 w-2/3 mb-3"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <label className="block mb-1 font-medium">New Password</label>
          <input
            type="password"
            className="border p-1 w-2/3 mb-3"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            onClick={handlePasswordChange}
            className="bg-blue-500 cursor-pointer block text-white p-1.5 rounded hover:bg-blue-600"
          >
            Change Password
          </button>
          {message && (
            <p className="mt-2 text-sm text-red-600 font-medium">{message}</p>
          )}
        </div>
      </section>

      {/* Product Management */}
      {(user?.role === "admin" || user?.role === "manager") && (
        <section className="my-6">
          <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {products.map((product) => (
              <li key={product.id} className="p-4 border rounded shadow-sm">
                <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                <div className="flex items-center gap-1">
                  <label className="text-sm text-gray-500">Stock:</label>
                  <input
                    type="number"
                    value={product.stock}
                    onChange={(e) => {
                      const newStock = parseInt(e.target.value);
                      setProducts((prev) =>
                        prev.map((p) =>
                          p.id === product.id ? { ...p, stock: newStock } : p
                        )
                      );
                    }}
                    className="border px-0.5 w-1/4  text-sm"
                  />
                  <button
                    onClick={() => handleStockUpdate(product)}
                    className="bg-primary text-white px-1 py-0.5 m-0 rounded text-sm hover:bg-secondary"
                  >
                    Apply
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button className="bg-green-500 text-white p-2 rounded cursor-pointer hover:bg-green-600">
            Add Product
          </button>
        </section>
      )}

      {/* User Role Management */}
      {user?.role === "admin" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
          <ul>
            {users.map((u) => {
              const isCurrentUser = u.id === user.id;
              const isProtectedUser = u.username === "admin";

              return (
                <li key={u.id} className="mb-2 flex items-center gap-4">
                  <span>
                    {u.username} - {u.role}
                  </span>

                  {!isCurrentUser && !isProtectedUser && (
                    <select
                      value={u.role}
                      onChange={async (e) => {
                        const newRole = e.target.value;
                        if (newRole === u.role) return;

                        const token = localStorage.getItem("token");
                        try {
                          const res = await fetch(
                            `${baseEndpoint}/user/updateRole`,
                            {
                              method: "PUT",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                              body: JSON.stringify({ userId: u.id, newRole }),
                            }
                          );
                          const data = await res.json();
                          if (res.ok) {
                            setUsers((prev) =>
                              prev.map((user) =>
                                user.id === u.id
                                  ? { ...user, role: newRole as User["role"] }
                                  : user
                              )
                            );
                            alert("Role updated successfully");
                          } else {
                            alert(data.message || "Failed to update role");
                          }
                        } catch (err) {
                          console.error("Error updating role:", err);
                          alert("Error updating role");
                        }
                      }}
                      className="border p-1 rounded text-sm bg-background"
                    >
                      <option value="client">Client</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  )}

                  {/* Delete Button */}
                  {!isCurrentUser && !isProtectedUser && (
                    <button
                      onClick={async () => {
                        const confirmed = window.confirm(
                          "Are you sure you want to delete this user?"
                        );
                        if (!confirmed) return;

                        const token = localStorage.getItem("token");
                        try {
                          const res = await fetch(
                            `${baseEndpoint}/user/delete`,
                            {
                              method: "DELETE",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                              body: JSON.stringify({ userId: u.id }),
                            }
                          );
                          const data = await res.json();
                          if (res.ok) {
                            setUsers((prev) =>
                              prev.filter((user) => user.id !== u.id)
                            );
                            alert("User deleted successfully");
                          } else {
                            alert(data.message || "Failed to delete user");
                          }
                        } catch (err) {
                          console.error("Error deleting user:", err);
                          alert("Error deleting user");
                        }
                      }}
                      className="bg-red-500 text-white p-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
};

export default DashboardPage;
