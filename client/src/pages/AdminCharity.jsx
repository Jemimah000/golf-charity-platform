import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://golf-charity-platform-5wiu.onrender.com";

const AdminCharity = () => {
  const [charities, setCharities] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    isFeatured: false,
    isActive: true,
    events: []
  });
  const [editingId, setEditingId] = useState(null);
  const [newEvent, setNewEvent] = useState("");
  const token = localStorage.getItem("token");

  const fetchCharities = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/charity`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCharities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCharities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/api/charity/update/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingId(null);
      } else {
        await axios.post(`${API_BASE}/api/charity/add`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({ name: "", description: "", image: "", isFeatured: false, isActive: true, events: [] });
      setNewEvent("");
      fetchCharities();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/charity/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCharities();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (charity) => {
    setEditingId(charity._id);
    setForm({
      name: charity.name,
      description: charity.description,
      image: charity.image,
      isFeatured: charity.isFeatured,
      isActive: charity.isActive,
      events: charity.events || [],
    });
  };

  const addEvent = () => {
    if (newEvent.trim() === "") return;
    setForm({ ...form, events: [...form.events, newEvent] });
    setNewEvent("");
  };

  const removeEvent = (index) => {
    const updatedEvents = form.events.filter((_, i) => i !== index);
    setForm({ ...form, events: updatedEvents });
  };

  return (
    <div className="min-h-screen p-6 bg-[#020617] text-white">
      <h1 className="text-3xl font-bold mb-6 text-[#2DD4BF]">Manage Charities</h1>

      {/* Charity Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3 max-w-lg">
        <input
          className="p-2 rounded bg-[#0b1224]"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="p-2 rounded bg-[#0b1224]"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          className="p-2 rounded bg-[#0b1224]"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        {/* Events */}
        <div className="flex gap-2 items-center">
          <input
            className="p-2 rounded bg-[#0b1224] flex-1"
            placeholder="Add Event"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
          />
          <button type="button" onClick={addEvent} className="bg-[#2DD4BF] text-black px-3 py-1 rounded">
            Add
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {form.events.map((event, i) => (
            <span key={i} className="bg-[#0891b2] px-2 py-1 rounded flex items-center gap-1">
              {event}
              <button type="button" onClick={() => removeEvent(i)} className="text-black font-bold">x</button>
            </span>
          ))}
        </div>

        {/* Checkboxes */}
        <div className="flex gap-3 items-center">
          <label>
            Featured:{" "}
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
            />
          </label>
          <label>
            Active:{" "}
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
          </label>
        </div>

        <button type="submit" className="bg-[#2DD4BF] text-black font-bold py-2 px-4 rounded">
          {editingId ? "Update Charity" : "Add Charity"}
        </button>
      </form>

      {/* Charity Table */}
      <table className="w-full text-left border-collapse border border-slate-700">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Events</th>
            <th className="border p-2">Featured</th>
            <th className="border p-2">Active</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {charities.map((c) => (
            <tr key={c._id}>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.events?.join(", ") || "None"}</td>
              <td className="border p-2">{c.isFeatured ? "Yes" : "No"}</td>
              <td className="border p-2">{c.isActive ? "Yes" : "No"}</td>
              <td className="border p-2 flex gap-2">
                <button onClick={() => handleEdit(c)} className="bg-yellow-500 text-black px-2 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(c._id)} className="bg-red-500 px-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCharity;