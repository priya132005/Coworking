import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../../Common/index.js";

const Card = ({ title, value }) => (
  <div className="p-6 transition bg-white shadow rounded-xl hover:shadow-lg">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="mt-2 text-3xl font-bold">{value}</p>
  </div>
);

const AdminHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(SummaryApi.getDashboardStats.url, {
          method: SummaryApi.getDashboardStats.method,
          credentials: "include",
        });
        const data = await response.json();

        if (data.success) {
          setStats(data.data);
        } else {
          toast.error(data.message || "Failed to load dashboard stats");
        }
      } catch (err) {
        toast.error("Could not connect to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  if (!stats) {
    return <p className="text-gray-500">Could not load dashboard stats.</p>;
  }

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card title="Total Users" value={stats.totalUsers} />
        <Card title="Total Bookings" value={stats.totalBookings} />
        <Card title="Revenue" value={`₹${stats.totalRevenue}`} />
        <Card title="Total Spaces" value={stats.totalSpaces} />
        <Card title="Pending Bookings" value={stats.pendingBookings} />
        <Card title="Confirmed Bookings" value={stats.confirmedBookings} />
      </div>

      <h2 className="mt-10 mb-4 text-xl font-bold">Recent Bookings</h2>
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 bg-gray-50">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Space</th>
              <th className="p-3">Date</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentBookings?.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">
                  No bookings yet
                </td>
              </tr>
            ) : (
              stats.recentBookings.map((b) => (
                <tr key={b._id} className="border-t">
                  <td className="p-3">{b.user?.name}</td>
                  <td className="p-3">{b.space?.name}</td>
                  <td className="p-3">
                    {b.date} {b.startTime}
                  </td>
                  <td className="p-3">₹{b.totalAmount}</td>
                  <td className="p-3 capitalize">{b.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminHome;
