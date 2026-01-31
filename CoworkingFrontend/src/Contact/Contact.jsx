import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.message) {
      toast.error("All fields are required");
      return;
    }

    toast.success("Message sent successfully!");
    setData({ name: "", email: "", message: "" });
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

        <button className="py-2 text-white bg-pink-700 rounded">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
