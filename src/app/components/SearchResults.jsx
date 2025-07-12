"use client";

import { useState, useEffect } from "react";
import CollegeCard from "./CollegeCard";

export default function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    async function fetchResults() {
      setLoading(true);
      try {
        const res = await fetch(`/api/colleges/search?name=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.slice(0, 3)); // limit to 3
        } else {
          setResults([]);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  if (!query) return null;

  return (
    <section className="my-12 max-w-5xl mx-auto px-4 text-center min-h-[400px]">
     
      <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
        Search Results for "{query}"
      </h2>

      <p className="text-gray-600 max-w-xl mx-auto mb-8">
        Showing top colleges matching your search.
      </p>

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : results.length === 0 ? (
        <p className="text-gray-500 text-lg">No colleges found matching your query.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((college) => (
            <CollegeCard key={college._id} college={college} />
          ))}
        </div>
      )}
    </section>
  );
}
