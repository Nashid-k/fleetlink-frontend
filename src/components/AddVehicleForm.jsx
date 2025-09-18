import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function AddVehicleForm() {
  const [form, setForm] = useState({ name: "", capacityKg: "", tyres: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/vehicles", form); // ✅ proxy handles URL
      setMessage("✅ Vehicle added successfully!");
      setForm({ name: "", capacityKg: "", tyres: "" });
    } catch (err) {
      setMessage("❌ Error adding vehicle.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          🚚 Add Vehicle
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Vehicle Name"
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
          <input
            type="number"
            name="capacityKg"
            value={form.capacityKg}
            onChange={handleChange}
            placeholder="Capacity (Kg)"
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
          <input
            type="number"
            name="tyres"
            value={form.tyres}
            onChange={handleChange}
            placeholder="Tyres"
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            required
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Add Vehicle
          </motion.button>
        </form>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-gray-300"
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
