"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex items-center justify-center px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1
          className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          404
        </motion.h1>

        <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          Oops! Page not found.
        </p>

        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link href="/" passHref>
          <motion.button
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to Homepage
          </motion.button>
        </Link>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
        
        </motion.div>
      </motion.div>
    </div>
  );
}
