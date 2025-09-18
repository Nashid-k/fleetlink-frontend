import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import AddVehiclePage from "./pages/AddVehiclePage";
import SearchBookPage from "./pages/SearchBookPage";
import Loader from "./components/Loader"; // 👈 import loader

export default function App() {
  const [loading, setLoading] = useState(true);

  // Show splash screen for 1.5s
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      {/* 🚖 Navbar */}
      <nav className="bg-black border-b border-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-extrabold tracking-wide text-green-400">
          FleetLink
        </h1>

        <div className="flex space-x-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `relative text-lg font-medium transition ${
                isActive ? "text-green-400" : "text-gray-300 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <motion.span whileHover={{ scale: 1.1 }} className="px-2">
                Search & Book
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
              `relative text-lg font-medium transition ${
                isActive ? "text-green-400" : "text-gray-300 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <motion.span whileHover={{ scale: 1.1 }} className="px-2">
                Add Vehicle
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

      {/* 🚀 Pages */}
      <Routes>
        <Route path="/" element={<SearchBookPage />} />
        <Route path="/add" element={<AddVehiclePage />} />
      </Routes>
    </Router>
  );
}
