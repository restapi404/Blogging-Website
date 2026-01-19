"use client";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search blogs..."
      value={query}
      onChange={handleChange}
      className="w-full md:w-1/2 p-2 mb-6 border rounded shadow bg-white dark:bg-black"
    />
  );
}