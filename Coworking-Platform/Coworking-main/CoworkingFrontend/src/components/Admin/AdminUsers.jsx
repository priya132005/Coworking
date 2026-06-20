import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SummaryApi from "../../Common/index.js";

const AdminUsers = () => {
  const currentUser = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch(SummaryApi.allUsers.url, {
        method: SummaryApi.allUsers.method,
        credentials: "include",
      });
      const data = await response.json();

      if (data.success) {
        setUsers(data.data);
      } else {
        toast.error(data.message || "Failed to load users");
      }
    } catch (err) {
      toast.error("Could not connect to the server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      const data = await response.json();

      if (data.success) {
        toast.success("User role updated");
        fetchUsers();
      } else {
        toast.error(data.message || "Failed to update role");
      }
    } catch (err) {
      toast.error("Could not connect to the server");
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading users...</p>;
  }

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Users</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 bg-gray-50">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Joined</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      u.role === "ADMIN"
                        ? "bg-pink-100 text-pink-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="p-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  {u._id === currentUser?._id ? (
                    <span className="text-xs text-gray-400">(You)</span>
                  ) : (
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="p-1 text-sm border rounded"
                    >
                      <option value="GENERAL">GENERAL</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminUsers;
