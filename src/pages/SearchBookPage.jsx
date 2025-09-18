import { useState } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import SearchForm from "../components/SearchForm";
import VehicleList from "../components/VehicleList";
import BookingList from "../components/BookingList";

export default function SearchBookPage() {
  const [vehicles, setVehicles] = useState([]);
  const [query, setQuery] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("search");

  const customerId = "demoUser123";

  const handleSearch = async (q) => {
    setLoading(true);
    setHasSearched(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await axios.get("/api/vehicles/available", { params: q });
      setVehicles(res.data.available);
      setQuery(q);
      setMessage("");
    } catch {
      setMessage("Error fetching vehicles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6 mt-4">🔎 FleetLink</h1>

        <div className="flex mb-6 bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("search")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
              activeTab === "search" ? "bg-green-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Search Vehicles
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
              activeTab === "bookings" ? "bg-green-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            My Bookings
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "search" ? (
            <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <SearchForm onSearch={handleSearch} isLoading={loading} />
              {message && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-center text-red-300 text-sm"
                >
                  {message}
                </motion.p>
              )}
              {!loading && hasSearched && (
                <VehicleList vehicles={vehicles} query={query} onBooked={setMessage} />
              )}
            </motion.div>
          ) : (
            <motion.div key="bookings" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <BookingList customerId={customerId} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}