/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Removed no-unused-vars
import { format, parseISO } from "date-fns";
import api from "../services/api.js"; 

export default function BookingList({ customerId }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBookings();
  }, [customerId]);

  const fetchBookings = async () => {
    try {
      const res = await api.get(`/api/bookings?customerId=${customerId}`); // Use api
      setBookings(res.data);
    } catch (error) {
      setMessage("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await api.delete(`/api/bookings/${bookingId}`); // Use api
      setMessage("Booking cancelled successfully");
      fetchBookings();
    } catch (error) {
      setMessage("Failed to cancel booking");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="mt-6 w-full text-white">
      <h3 className="text-xl font-bold mb-4 text-center">📋 My Bookings</h3>

      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-3 bg-green-900/30 border border-green-700/50 rounded-lg text-center text-sm text-green-300"
        >
          {message}
        </motion.p>
      )}

      {bookings.length === 0 ? (
        <p className="text-center text-gray-400 py-4">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-lg font-bold">{booking.vehicleId?.name || "Unknown Vehicle"}</p>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <p className="text-gray-400">From: {booking.fromPincode}</p>
                    <p className="text-gray-400">To: {booking.toPincode}</p>
                    <p className="text-gray-400">
                      Start: {format(parseISO(booking.startTime), "MMM dd, yyyy hh:mm a")}
                    </p>
                    <p className="text-gray-400">
                      End: {format(parseISO(booking.endTime), "MMM dd, yyyy hh:mm a")}
                    </p>
                  </div>
                  <p className="text-green-400 font-medium text-sm mt-2">
                    Status: {new Date(booking.endTime) > new Date() ? "Active" : "Completed"}
                  </p>
                </div>
                
                {new Date(booking.startTime) > new Date() && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => cancelBooking(booking._id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-2 rounded-lg shadow-md transition text-sm ml-4"
                  >
                    Cancel
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}