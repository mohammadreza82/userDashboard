import React from "react";
import { useSearchParams } from "react-router-dom";

export const RoleFilter: React.FC = () => {
  // Get the search parameters from the URL and set the role to "all" if it doesn't exist
  const [searchParams, setSearchParams] = useSearchParams();
  const role = searchParams.get("role") || "all";

  // Function to handle role change
  const handleRoleChange = (newRole: string) => {
    // Create a new URLSearchParams object from the current search parameters
    const currentParams = new URLSearchParams(searchParams);
    // If the new role is "all", delete the role parameter from the search parameters
    if (newRole === "all") {
      currentParams.delete("role");
    // Otherwise, set the role parameter to the new role
    } else {
      currentParams.set("role", newRole);
    }
    // Set the search parameters to the new search parameters
    setSearchParams(currentParams);
  };

  return (
    <React.Fragment>
      <select
        value={role}
        onChange={(e) => handleRoleChange(e.target.value)}
        className="p-2 border rounded border-gray-300"
      >
        <option value="all">All Roles</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="guest">Guest</option>
      </select>
    </React.Fragment>
  );
};
