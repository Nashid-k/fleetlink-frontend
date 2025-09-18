import { useState } from "react";
import { motion } from "framer-motion";

export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState({
    capacityRequired: "",
    fromPincode: "",
    toPincode: "",
    startTime: "",
  });

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="space-y-5 bg-gray-900 border border-gray-700 p-8 shadow-xl rounded-2xl max-w-lg mx-auto text-white"
    >
      <h2 className="text-2xl font-bold text-center mb-4">🔍 Search Vehicles</h2>

      <input
        type="number"
        name="capacityRequired"
        value={query.capacityRequired}
        onChange={handleChange}
        placeholder="Capacity Required (Kg)"
        className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
        required
      />

      <input
        name="fromPincode"
        value={query.fromPincode}
        onChange={handleChange}
        placeholder="From Pincode"
        className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
        required
      />

      <input
        name="toPincode"
        value={query.toPincode}
        onChange={handleChange}
        placeholder="To Pincode"
        className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
        required
      />

      <input
        type="datetime-local"
        name="startTime"
        value={query.startTime}
        onChange={handleChange}
        className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
        required
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
      >
        Search
      </motion.button>
    </motion.form>
  );
}
