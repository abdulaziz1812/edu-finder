"use client";
import React from "react";
import Link from "next/link";

export default function Cards({ college }) {
  const researchCount = college.researchHistory?.length || 0;
  const { start, end } = college.admissionDates || {};

  return (
    <article className="bg-base-100 border border-base-200 rounded-lg shadow hover:shadow-lg transition duration-300 flex flex-col overflow-hidden">
      <figure className="h-48 w-full overflow-hidden">
        <img
          src={college.image || "/default-college.jpg"}
          alt={college.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </figure>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">{college.name}</h2>
          <p className="text-yellow-500 font-medium mb-1">Rating: {college.rating || "N/A"} ⭐</p>
          <p className="text-sm text-gray-600">
            <strong>Admission:</strong> {start || "N/A"} to {end || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Research Papers:</strong> {researchCount}
          </p>
        </div>

        <div className="mt-4">
          <Link
            href={`/colleges/${college._id}`}
            className="btn btn-sm btn-outline btn-primary w-full text-center"
            aria-label={`View details of ${college.name}`}
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
