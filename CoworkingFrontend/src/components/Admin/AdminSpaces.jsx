import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../../Common/index.js";

const emptyForm = {
  name: "",
  description: "",
  category: "Hot Desk",
  city: "",
  address: "",
  pricePerHour: "",
  capacity: "",
  amenities: "",
};

const AdminSpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState([]);
  const [saving, setSaving] = useState(false);

  const fetchSpaces = async () => {
    try {
      const response = await fetch(SummaryApi.getAllSpacesAdmin.url, {
        method: SummaryApi.getAllSpacesAdmin.method,
        credentials: "include",
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
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setImages([]);
    setEditingId(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (space) => {
    setForm({
      name: space.name,
      description: space.description,
      category: space.category,
      city: space.city,
      address: space.address,
      pricePerHour: space.pricePerHour,
      capacity: space.capacity,
      amenities: (space.amenities || []).join(", "),
    });
    setEditingId(space._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this space? This cannot be undone.")) return;
    try {
      const { url, method } = SummaryApi.deleteSpace(id);
      const response = await fetch(url, { method, credentials: "include" });
      const data = await response.json();

      if (data.success) {
        toast.success("Space deleted");
        fetchSpaces();
      } else {
        toast.error(data.message || "Failed to delete space");
      }
    } catch (err) {
      toast.error("Could not connect to the server");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      images.forEach((img) => formData.append("images", img));

      const { url, method } = editingId
        ? SummaryApi.updateSpace(editingId)
        : SummaryApi.createSpace;

      const response = await fetch(url, {
        method,
        credentials: "include",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        toast.success(editingId ? "Space updated" : "Space created");
        resetForm();
        fetchSpaces();
      } else {
        toast.error(data.message || "Failed to save space");
      }
    } catch (err) {
      toast.error("Could not connect to the server");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading spaces...</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Spaces</h1>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="px-4 py-2 text-sm font-medium text-white bg-pink-700 rounded-lg hover:bg-pink-800"
        >
          {showForm ? "Cancel" : "+ Add Space"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-3 p-4 mb-6 bg-white shadow rounded-xl sm:grid-cols-2"
        >
          <input
            name="name"
            placeholder="Space name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="Hot Desk">Hot Desk</option>
            <option value="Dedicated Desk">Dedicated Desk</option>
            <option value="Private Office">Private Office</option>
            <option value="Meeting Room">Meeting Room</option>
            <option value="Conference Room">Conference Room</option>
          </select>
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            name="pricePerHour"
            type="number"
            placeholder="Price per hour"
            value={form.pricePerHour}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            name="capacity"
            type="number"
            placeholder="Capacity"
            value={form.capacity}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            name="amenities"
            placeholder="Amenities (comma separated)"
            value={form.amenities}
            onChange={handleChange}
            className="p-2 border rounded sm:col-span-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            className="p-2 border rounded sm:col-span-2"
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
            className="sm:col-span-2"
          />

          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 text-white bg-pink-700 rounded-lg sm:col-span-2 hover:bg-pink-800 disabled:opacity-60"
          >
            {saving ? "Saving..." : editingId ? "Update Space" : "Create Space"}
          </button>
        </form>
      )}

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 bg-gray-50">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">City</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price/hr</th>
              <th className="p-3">Active</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {spaces.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-400">
                  No spaces yet — add your first one above.
                </td>
              </tr>
            ) : (
              spaces.map((s) => (
                <tr key={s._id} className="border-t">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.city}</td>
                  <td className="p-3">{s.category}</td>
                  <td className="p-3">₹{s.pricePerHour}</td>
                  <td className="p-3">{s.isActive ? "Yes" : "No"}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(s)}
                      className="text-pink-700 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminSpaces;
