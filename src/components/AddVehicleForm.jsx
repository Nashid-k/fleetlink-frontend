import { useState } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Loader from "../components/Loader";

export default function AddVehicleForm() {
  const [form, setForm] = useState({ name: "", capacityKg: "", tyres: "", estimatedRideDurationHours: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/vehicles", form);
      setMessage("Vehicle added successfully!");
      setForm({ name: "", capacityKg: "", tyres: "", estimatedRideDurationHours: "" });
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setMessage("❌ Error adding vehicle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {loading && <Loader />}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-5 text-center">
          🚚 Add Vehicle
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Vehicle Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g., Delivery Truck"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>
          
          <div>
            <label htmlFor="capacityKg" className="block text-sm font-medium text-gray-300 mb-1">
              Capacity (Kg)
            </label>
            <input
              type="number"
              id="capacityKg"
              name="capacityKg"
              value={form.capacityKg}
              onChange={handleChange}
              placeholder="e.g., 1000"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>
          
          <div>
            <label htmlFor="tyres" className="block text-sm font-medium text-gray-300 mb-1">
              Number of Tyres
            </label>
            <input
              type="number"
              id="tyres"
              name="tyres"
              value={form.tyres}
              onChange={handleChange}
              placeholder="e.g., 4"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>
          
          <div>
            <label htmlFor="estimatedRideDurationHours" className="block text-sm font-medium text-gray-300 mb-1">
              Estimated Duration (Hours)
            </label>
            <input
              type="number"
              id="estimatedRideDurationHours"
              name="estimatedRideDurationHours"
              value={form.estimatedRideDurationHours}
              onChange={handleChange}
              placeholder="e.g., 3.5"
              step="0.5"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg shadow-md transition"
          >
            Add Vehicle
          </motion.button>
        </form>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 bg-green-900/30 border border-green-700/50 rounded-lg text-center text-sm text-green-300"
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}