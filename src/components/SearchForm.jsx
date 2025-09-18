import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// eslint-disable-next-line no-unused-vars
import api from "../services/api.js"; 

export default function SearchForm({ onSearch, isLoading }) {
  const [query, setQuery] = useState({
    capacityRequired: "",
    fromPincode: "",
    toPincode: "",
    startTime: new Date(),
  });

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setQuery({ ...query, startTime: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ ...query, startTime: query.startTime.toISOString() });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-900 border border-gray-700 p-6 rounded-lg w-full text-white"
    >
      <h2 className="text-lg font-bold text-center">🔍 Search Vehicles</h2>

      <div>
        <label htmlFor="capacityRequired" className="block text-sm text-gray-300 mb-1">
          Capacity Required (Kg)
        </label>
        <input
          type="number"
          id="capacityRequired"
          name="capacityRequired"
          value={query.capacityRequired}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-400"
          required
          min="1"
        />
      </div>

      <div>
        <label htmlFor="fromPincode" className="block text-sm text-gray-300 mb-1">
          From Pincode
        </label>
        <input
          id="fromPincode"
          name="fromPincode"
          value={query.fromPincode}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-400"
          required
          pattern="[0-9]{6}"
          title="6-digit pincode"
        />
      </div>

      <div>
        <label htmlFor="toPincode" className="block text-sm text-gray-300 mb-1">
          To Pincode
        </label>
        <input
          id="toPincode"
          name="toPincode"
          value={query.toPincode}
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-400"
          required
          pattern="[0-9]{6}"
          title="6-digit pincode"
        />
      </div>

      <div>
        <label htmlFor="startTime" className="block text-sm text-gray-300 mb-1">
          Start Date & Time
        </label>
        <DatePicker
          id="startTime"
          selected={query.startTime}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-400"
          required
        />
      </div>

      <motion.button
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 py-3 rounded-lg transition flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg
              className="w-5 h-5 mr-2 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Searching...
          </>
        ) : (
          "Search Vehicles"
        )}
      </motion.button>
    </motion.form>
  );
}