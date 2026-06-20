import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../../Common/index.js";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await fetch(SummaryApi.getAllMessages.url, {
        method: SummaryApi.getAllMessages.method,
        credentials: "include",
      });
      const data = await response.json();

      if (data.success) {
        setMessages(data.data);
      } else {
        toast.error(data.message || "Failed to load messages");
      }
    } catch (err) {
      toast.error("Could not connect to the server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      const { url, method } = SummaryApi.markMessageAsRead(id);
      const response = await fetch(url, { method, credentials: "include" });
      const data = await response.json();

      if (data.success) {
        fetchMessages();
      } else {
        toast.error(data.message || "Failed to update message");
      }
    } catch (err) {
      toast.error("Could not connect to the server");
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading messages...</p>;
  }

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Contact Messages</h1>

      {messages.length === 0 ? (
        <div className="p-6 text-center text-gray-400 bg-white rounded-xl shadow">
          No messages yet.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m._id}
              className={`p-4 bg-white rounded-xl shadow border-l-4 ${
                m.isRead ? "border-gray-200" : "border-pink-600"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-800">
                    {m.name}{" "}
                    <span className="text-sm font-normal text-gray-400">
                      ({m.email})
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-gray-600">{m.message}</p>
                  <p className="mt-2 text-xs text-gray-400">
                    {new Date(m.createdAt).toLocaleString()}
                  </p>
                </div>
                {!m.isRead && (
                  <button
                    onClick={() => handleMarkRead(m._id)}
                    className="px-3 py-1 text-xs font-medium text-pink-700 border border-pink-700 rounded-full whitespace-nowrap hover:bg-pink-50"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminMessages;
