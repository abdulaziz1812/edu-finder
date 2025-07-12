"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(search.trim());
  };

  return (
    <section className="mb-2 px-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-md mx-auto"
      >
        <input
          type="text"
          placeholder="Search college name..."
          className="input input-bordered w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-outline btn-xs sm:btn-md px-8">
          Search
        </button>
      </form>
    </section>
  );
}
