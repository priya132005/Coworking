import React, { useEffect, useState } from "react";
import SummaryApi from "../../Common/index.js";
import SpaceCard from "./SpaceCard.jsx";
import { toast } from "react-toastify";

export default function SpacesList() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  const fetchSpaces = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (city) params.append("city", city);
      if (category) params.append("category", category);

      const response = await fetch(`${SummaryApi.getAllSpaces.url}?${params.toString()}`, {
        method: SummaryApi.getAllSpaces.method,
      });
      const data = await response.json();

      if (data.success) {
        setSpaces(data.data);
      } else {
        toast.error(data.message || "Failed to load spaces");
      }
    } catch (err) {
      toast.error("Could not connect to the server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSpaces();
  };

  return (
    <section className="container px-4 py-10 mx-auto">
      <h1 className="mb-2 text-3xl font-bold text-center text-gray-800">
        Find Your Workspace
      </h1>
      <p className="mb-8 text-center text-gray-500">
        Browse coworking spaces and book by the hour.
      </p>

      <form
        onSubmit={handleSearchSubmit}
        className="grid grid-cols-1 gap-3 mb-8 sm:grid-cols-4"
      >
        <input
          type="text"
          placeholder="Search by name or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded sm:col-span-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="Hot Desk">Hot Desk</option>
          <option value="Dedicated Desk">Dedicated Desk</option>
          <option value="Private Office">Private Office</option>
          <option value="Meeting Room">Meeting Room</option>
          <option value="Conference Room">Conference Room</option>
        </select>
        <button
          type="submit"
          className="p-2 font-medium text-white bg-pink-700 rounded hover:bg-pink-800"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Loading spaces...</p>
      ) : spaces.length === 0 ? (
        <p className="text-center text-gray-500">
          No spaces found. Try a different search.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {spaces.map((space) => (
            <SpaceCard key={space._id} space={space} />
          ))}
        </div>
      )}
    </section>
  );
}
