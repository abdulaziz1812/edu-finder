"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Cards from "../components/Cards";

export default function CollegesPage() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/colleges")
      .then((res) => res.json())
      .then((data) => setColleges(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-5xl mt-8 mx-auto px-4 py-12 min-h-scr">
      <div className="text-center mb-10">
        <motion.h1
          className="text-4xl font-extrabold text-gray-900 mb-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Browse All Colleges
        </motion.h1>
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Discover all available colleges with detailed information about
          admission, research, and student life.
        </motion.p>
      </div>

      {loading ? (
        <motion.div
          className="flex justify-center items-center min-h-screen py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="loading loading-spinner loading-xl "></span>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {colleges.length > 0 ? (
            colleges.map((college, index) => (
              <motion.div
                key={college._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.3
                 }}
              >
                <Cards college={college} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              No colleges found.
            </motion.div>
          )}
        </motion.div>
      )}
    </section>
  );
}
