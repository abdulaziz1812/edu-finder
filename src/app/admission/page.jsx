"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function Spinner() {
  return (
    <div className="flex justify-center items-center py-12 min-h-screen">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="w-6 h-6 text-gray-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      aria-label="Go to admission form"
      title="Go to admission form"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
    </svg>
  );
}

export default function AdmissionPage() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchColleges() {
      try {
        const res = await fetch("/api/colleges");
        if (res.ok) {
          const data = await res.json();
          setColleges(data);
        }
      } catch (error) {
        console.error("Failed to fetch colleges:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchColleges();
  }, []);

  return (
    <section className="max-w-3xl mx-auto px-4 py-10 mt-10">
      <motion.h1
        className="text-3xl font-bold mb-2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Select a College for Admission
      </motion.h1>

      <motion.p
        className="text-center text-gray-600 mb-8 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Choose from the list of available colleges below to start your admission process.
      </motion.p>

      {loading ? (
        <Spinner />
      ) : colleges.length > 0 ? (
        <motion.ul
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {colleges.map((college, index) => (
            <motion.li
              key={college._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/admission/${college._id}`}
                className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg hover:shadow-xl hover:bg-gray-50 hover:scale-105 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {college.image ? (
                    <img
                      src={college.image}
                      alt={college.name}
                      className="w-14 h-14 rounded-md object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-md bg-gray-300 flex items-center justify-center text-gray-600">
                      N/A
                    </div>
                  )}

                  <span className="text-lg font-semibold ">
                    {college.name}
                  </span>
                </div>

                <div className="flex items-center gap-1 font-semibold">
                  <span>Admission</span>
                  <ArrowIcon />
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <motion.p
          className="text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          No colleges found.
        </motion.p>
      )}
    </section>
  );
}
