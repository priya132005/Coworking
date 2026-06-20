import React, { useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../Common/index.js";

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.message) {
      toast.error("All fields are required");
      return;
    }

    setSending(true);
    try {
      const response = await fetch(SummaryApi.sendMessage.url, {
        method: SummaryApi.sendMessage.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Message sent successfully!");
        setData({ name: "", email: "", message: "" });
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch (err) {
      toast.error("Could not connect to the server");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-xl p-6 mx-auto">
      <h2 className="mb-4 text-3xl font-bold">Contact Us</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Your Name"
          value={data.name}
          onChange={handleChange}
          className="p-2 border"
        />
        <input
          name="email"
          placeholder="Your Email"
          value={data.email}
          onChange={handleChange}
          className="p-2 border"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={data.message}
          onChange={handleChange}
          className="p-2 border"
        />

        <button
          type="submit"
          disabled={sending}
          className="py-2 text-white bg-pink-700 rounded disabled:opacity-60"
        >
          {sending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
