import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import type { User } from "../types/user";
import { SearchInput } from "../components/SearchInput";
import { RoleFilter } from "../components/RoleFilter";
import { UserTable } from "../components/UserTable";
import { Pagination } from "../components/Pagination";
import { UserModal } from "../components/UserModal";
import { FiUsers, FiLoader } from "react-icons/fi";

// Define a functional component called Home
const Home = () => {
  // Use the useSearchParams hook to get the search parameters from the URL
  const [searchParams] = useSearchParams();
  // Use the useUsers hook to get the users data
  const { data: users = [], isLoading } = useUsers();
  // Use the useState hook to set the selected user
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Get the search, role, page, and itemsPerPage from the search parameters
  const search = searchParams.get("search")?.toLowerCase() || "";
  const role = searchParams.get("role") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 5;

  // Filter the users based on the search and role
  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(search))
    .filter((user) => role === "all" || user.role === role);

  // Paginate the filtered users
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  return (
    <React.Fragment>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
          {/* Header Section */}
          <header className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <FiUsers className="text-3xl text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">
                User Dashboard
              </h1>
            </div>
            <p className="text-gray-600">
              Manage and explore your user database
            </p>
          </header>
          {/* Filter Controls */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SearchInput />
              <RoleFilter />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-12">
                <FiLoader className="animate-spin text-4xl text-blue-500 mb-4" />
                <p className="text-gray-600">Loading user data...</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  <UserTable
                    users={paginatedUsers}
                    onUserClick={setSelectedUser}
                  />
                </div>

                <div className="px-6 py-4 border-t border-gray-300  sticky bottom-0">
                  <Pagination
                    totalItems={filteredUsers.length}
                    itemsPerPage={itemsPerPage}
                  />
                </div>
              </div>
            )}
          </div>

          {/* User Modal */}
          <UserModal
            isOpen={!!selectedUser}
            onRequestClose={() => setSelectedUser(null)}
            user={selectedUser}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
