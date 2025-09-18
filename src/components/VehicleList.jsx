import axios from "axios";
import { motion } from "framer-motion";

export default function VehicleList({ vehicles, query, onBooked }) {
  const bookVehicle = async (vehicleId) => {
    try {
      const res = await axios.post("/api/bookings", {
        vehicleId,
        fromPincode: query.fromPincode,
        toPincode: query.toPincode,
        startTime: query.startTime,
        customerId: "demoUser123",
      });
      onBooked(`✅ Booking confirmed: ${res.data._id}`);
    } catch (err) {
      onBooked("❌ Booking failed (maybe already booked).");
    }
  };

  return (
    <div className="mt-10 max-w-3xl mx-auto text-white">
      <h3 className="text-2xl font-bold mb-6 text-center">🚗 Available Vehicles</h3>

      {vehicles.length === 0 && (
        <p className="text-center text-gray-400">No vehicles available.</p>
      )}

      <ul className="space-y-5">
        {vehicles.map((v, index) => (
          <motion.li
            key={v._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex justify-between items-center shadow-lg hover:shadow-green-500/20 transition"
          >
            <div>
              <p className="text-lg font-bold">{v.name}</p>
              <p className="text-gray-400">Capacity: {v.capacityKg} Kg</p>
              <p className="text-gray-400">Tyres: {v.tyres}</p>
              <p className="text-green-400 font-medium">
                ⏱ Estimated Duration: {v.estimatedRideDurationHours} hrs
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => bookVehicle(v._id)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
            >
              Book Now
            </motion.button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
