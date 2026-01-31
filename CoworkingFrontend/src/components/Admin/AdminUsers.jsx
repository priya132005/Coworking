import React from "react";

const AdminUsers = () => {
  const users = [
    { id: 1, name: "Priya", role: "User" },
    { id: 2, name: "Admin", role: "Admin" },
  ];

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Users</h1>

      <ul className="bg-white rounded shadow">
        {users.map((u) => (
          <li key={u.id} className="p-4 border-b">
            {u.name} — <span className="font-semibold">{u.role}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdminUsers;
