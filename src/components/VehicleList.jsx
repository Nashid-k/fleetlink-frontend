import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

export default function VehicleList({ vehicles, query, onBooked }) {
  const [bookingId, setBookingId] = useState(null);

  const bookVehicle = async (vehicleId) => {
    setBookingId(vehicleId);
    try {
      const res = await axios.post("/api/bookings", {
        vehicleId,
        fromPincode: query.fromPincode,
        toPincode: query.toPincode,
        startTime: query.startTime,
        customerId: "demoUser123",
      });
      onBooked(`✅ Booking confirmed: ${res.data._id}`);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      onBooked("❌ Booking failed (maybe already booked).");
    } finally {
      setBookingId(null);
    }
  };

  // vehicle emojies 
  const getVehicleImage = (vehicleName) => {
    const name = vehicleName.toLowerCase();
    
    if (name.includes('car') || name.includes('sedan') || name.includes('suv')) {
      return "🚗";
    } else if (name.includes('bike') || name.includes('motorcycle')) {
      return "🏍️";
    } else if (name.includes('auto') || name.includes('rickshaw') || name.includes('tuk')) {
      return "🛺";
    } else if (name.includes('truck') || name.includes('lorry')) {
      return "🚚";
    } else if (name.includes('van') || name.includes('minivan')) {
      return "🚐";
    } else if (name.includes('cycle') || name.includes('bicycle')) {
      return "🚲";
    } else {
      return "🚗"; //default is set into car 
    }
  };

  return (
    <div className="mt-6 w-full text-white">
      <h3 className="text-xl font-bold mb-4 text-center">🚗 Available Vehicles</h3>

      {vehicles.length === 0 && (
        <p className="text-center text-gray-400 py-4">No vehicles available for your search criteria.</p>
      )}

      <div className="space-y-4">
        {vehicles.map((v, index) => (
          <motion.div
            key={v._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-start space-x-4">
              
              {/* Vehicle icon */}
              <div className="text-3xl flex-shrink-0">
                {getVehicleImage(v.name)}
              </div>
              
              <div className="flex-grow">
                <p className="text-lg font-bold">{v.name}</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <p className="text-gray-400 text-sm">Capacity: {v.capacityKg} Kg</p>
                  <p className="text-gray-400 text-sm">Tyres: {v.tyres}</p>
                </div>
                <p className="text-green-400 font-medium text-sm mt-2">
                  ⏱ Est. Duration: {v.estimatedRideDurationHours} hrs
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => bookVehicle(v._id)}
                disabled={bookingId === v._id}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition text-sm flex items-center"
              >
                {bookingId === v._id ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Booking...
                  </>
                ) : (
                  "Book Now"
                )}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}