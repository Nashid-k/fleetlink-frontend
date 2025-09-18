import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SearchForm from "../components/SearchForm";
import VehicleList from "../components/VehicleList";
import Loader from "../components/Loader";

export default function SearchBookPage() {
  const [vehicles, setVehicles] = useState([]);
  const [query, setQuery] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (q) => {
    setLoading(true);
    try {
      const res = await axios.get("/api/vehicles/available", { params: q });
      setVehicles(res.data.available);
      setQuery(q);
      setMessage("");
    } catch {
      setMessage("❌ Error fetching vehicles");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        <h1 className="text-3xl font-extrabold text-center mb-8">
          🔎 FleetLink – Search & Book
        </h1>

        <SearchForm onSearch={handleSearch} />

        {loading ? (
          <Loader />
        ) : (
          <>
            {message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-5 text-center text-red-400"
              >
                {message}
              </motion.p>
            )}
            <VehicleList vehicles={vehicles} query={query} onBooked={setMessage} />
          </>
        )}
      </motion.div>
    </div>
  );
}
