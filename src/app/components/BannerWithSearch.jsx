"use client";

import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

export default function BannerWithSearch({ onSearch }) {
  return (
    <section
      className="relative w-full min-h-[80vh] bg-cover bg-center bg-no-repeat flex items-center "
      style={{
        backgroundImage: "url('/banner.jpg')", 
      }}
    >
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10 w-full">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white space-y-6"
        >
          <h1 className="text-center sm:text-left text-xl sm:text-3xl xl:text-5xl md:text-4xl font-bold leading-tight drop-shadow mt-16 sm:mt-0">
            Discover Top Colleges <br /> & Book Admission Easily
          </h1>
          <p className="text-center sm:text-left sm-text-lg text-gray-200 drop-shadow max-w-lg ">
            Welcome to <span className="font-bold "> 🔍EduFinder</span>, your trusted platform to search, explore, and book admission in reputed colleges with ease.
          </p>
        </motion.div>

        {/* Right*/}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="bg-white/70  p-2 rounded-xl shadow-xl w-full max-w-md mx-auto"
        >
          <h3 className="sm:text-xl font-semibold mb-2 text-center ">
            🔍 Find Your Dream College
          </h3>
          <SearchBar onSearch={onSearch} />
        </motion.div>
      </div>
    </section>
  );
}
