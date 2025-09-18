import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import AddVehiclePage from "./pages/AddVehiclePage";
import SearchBookPage from "./pages/SearchBookPage";
import Loader from "./components/Loader";

export default function App() {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <nav className="bg-black border-b border-gray-800 text-white px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide text-green-400">
          FleetLink
        </h1>

        <div className="flex space-x-2 sm:space-x-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `relative text-sm sm:text-lg font-medium transition ${
                isActive ? "text-green-400" : "text-gray-300 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <motion.span 
                whileHover={{ scale: 1.05 }} 
                className="px-1 sm:px-2 block"
              >
                <span className="hidden sm:inline">Search & Book</span>
                <span className="sm:hidden">🔍 Search</span>
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 -bottom-1 h-[2px] bg-green-400 rounded"
                  />
                )}
              </motion.span>
            )}
          </NavLink>

          <NavLink
            to="/add"
            className={({ isActive }) =>
              `relative text-sm sm:text-lg font-medium transition ${
                isActive ? "text-green-400" : "text-gray-300 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <motion.span 
                whileHover={{ scale: 1.05 }} 
                className="px-1 sm:px-2 block"
              >
                <span className="hidden sm:inline">Add Vehicle</span>
                <span className="sm:hidden">➕ Add</span>
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 -bottom-1 h-[2px] bg-green-400 rounded"
                  />
                )}
              </motion.span>
            )}
          </NavLink>
        </div>
      </nav>

      
      <Routes>
        <Route path="/" element={<SearchBookPage />} />
        <Route path="/add" element={<AddVehiclePage />} />
      </Routes>
    </Router>
  );
}