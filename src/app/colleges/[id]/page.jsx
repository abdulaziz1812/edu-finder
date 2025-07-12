"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import ReviewSection from "@/app/components/ReviewSection";
import { motion } from "framer-motion";

export default function CollegeDetailsPage() {
  const { id: collegeId } = useParams();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  const Spinner = () => (
    <div className="flex justify-center items-center py-20 min-h-screen">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!collegeId) return;

    const fetchCollege = async () => {
      try {
        const res = await fetch(`/api/colleges/${collegeId}`);
        if (res.ok) {
          const data = await res.json();
          setCollege(data);
        }
      } catch (err) {
        console.error("Failed to load college:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [collegeId]);

  if (loading || !user || !college) {
    return <Spinner />;
  }

  return (
    <div className="max-w-5xl mt-10 mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-12">
        <motion.h1
          className="text-4xl font-extrabold mb-2 "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {college.name}
        </motion.h1>
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Explore admission dates, research, events, sports, and student life in detail.
        </motion.p>
      </div>
      <motion.img
        src={college.image}
        alt={college.name}
        className="w-full h-72 object-cover rounded-lg shadow mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />

    
      <div className="grid md:grid-cols-2 gap-10">
        {/* left */}
        <motion.div
          className="space-y-6 border p-4 rounded-lg shadow-lg border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div>
            <h3 className="text-lg font-semibold ">Admission Details</h3>
            <p className="text-gray-700">
              <strong>Dates:</strong> {college.admissionDates?.start || "N/A"} to {college.admissionDates?.end || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Process:</strong> {college.admissionProcess || "Information not available."}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold ">Events</h3>
            <ul className="list-disc ml-5 text-gray-600">
              {college.events?.length ? (
                college.events.map((event, i) => <li key={i}>{event}</li>)
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold ">Research Works</h3>
            <ul className="list-disc ml-5 text-gray-600">
              {college.researchHistory?.length ? (
                college.researchHistory.map((item, i) => <li key={i}>{item}</li>)
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold ">Sports</h3>
            <ul className="list-disc ml-5 text-gray-600">
              {college.sports?.length ? (
                college.sports.map((sport, i) => <li key={i}>{sport}</li>)
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>
        </motion.div>

        {/* right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8,duration: 0.6 }}
          className="space-y-6 border p-4 rounded-lg shadow-lg border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <h3 className="text-xl font-semibold  mb-4">Graduates Gallery</h3>
          {college.gallery?.length ? (
            <div className="grid grid-cols-2 gap-4">
              {college.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Gallery ${i}`}
                  className="w-full h-40 object-cover rounded shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No gallery images available.</p>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-12"
      >
        <ReviewSection collegeId={collegeId} />
      </motion.div>
    </div>
  );
}
