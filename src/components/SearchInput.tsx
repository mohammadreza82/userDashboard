import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

export const SearchInput: React.FC = () => {
  // Declare a state variable to store the search parameters and a function to update them
  const [searchParams, setSearchParams] = useSearchParams();
  // Declare a state variable to store the search query and a function to update it
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // Use the useEffect hook to update the search parameters whenever the search query changes
  useEffect(() => {
    // Create a new URLSearchParams object from the current search parameters
    const currentParams = new URLSearchParams(searchParams);
    // If there is a search query, set it in the search parameters
    if (search) {
      currentParams.set("search", search);
    // Otherwise, delete the search parameter
    } else {
      currentParams.delete("search");
    }
    // Update the search parameters
    setSearchParams(currentParams);
  }, [search, setSearchParams]);

  return (
    <React.Fragment>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name..."
        className="p-2 border rounded w-full max-w-xs"
      />
    </React.Fragment>
  );
};
