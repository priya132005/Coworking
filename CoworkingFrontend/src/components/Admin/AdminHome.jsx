import React from "react";

const AdminHome = () => {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card title="Total Users" value="120" />
        <Card title="Total Bookings" value="45" />
        <Card title="Revenue" value="₹12,500" />
      </div>
    </>
  );
};

const Card = ({ title, value }) => (
  <div className="p-6 transition bg-white shadow rounded-xl hover:shadow-lg">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="mt-2 text-3xl font-bold">{value}</p>
  </div>
);

export default AdminHome;
