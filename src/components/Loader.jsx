import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Shimmer Glow Effect */}
        <div className="absolute -inset-6 bg-gradient-to-r from-green-400 via-green-600 to-green-400 
                        rounded-full blur-2xl opacity-60 animate-pulse"></div>

        {/* FleetLink Logo */}
        <h1 className="text-4xl font-extrabold tracking-wide text-green-400 relative z-10">
          FleetLink
        </h1>
      </motion.div>
    </div>
  );
}
