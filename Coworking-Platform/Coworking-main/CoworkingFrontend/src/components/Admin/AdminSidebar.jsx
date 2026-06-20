import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const linkStyle = ({ isActive }) =>
    isActive
      ? "block px-4 py-2 bg-pink-600 text-white rounded"
      : "block px-4 py-2 hover:bg-gray-700 rounded";

  return (
    <aside className="w-64 min-h-screen p-6 text-white bg-gray-900">
      <h2 className="mb-8 text-2xl font-bold">Admin Panel</h2>
      <nav className="space-y-3">
        <NavLink to="/admin/dashboard" end className={linkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/dashboard/bookings" className={linkStyle}>
          Bookings
        </NavLink>
        <NavLink to="/admin/dashboard/users" className={linkStyle}>
          Users
        </NavLink>
        <NavLink to="/admin/dashboard/spaces" className={linkStyle}>
          Spaces
        </NavLink>
        <NavLink to="/admin/dashboard/messages" className={linkStyle}>
          Messages
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
