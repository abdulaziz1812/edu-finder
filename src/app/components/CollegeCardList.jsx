"use client";

import { useEffect, useState } from "react";
import CollegeCard from "./CollegeCard";

export default function CollegeCardList() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("/api/colleges/featured");
        const data = await res.json();
        setColleges(data);
      } catch (err) {
        console.error("Failed to fetch colleges", err);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-10 min-h-[400px]">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  return (
    <section className="my-12 max-w-5xl mx-auto px-4 text-center min-h-[400px]">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
        Featured Colleges
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-8">
        Explore some of the best colleges carefully selected for you. Find the perfect fit for your future.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <CollegeCard key={college._id} college={college} />
        ))}
      </div>
    </section>
  );
}
