import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import type { User } from "../types/user";
import { SearchInput } from "../components/SearchInput";
import { RoleFilter } from "../components/RoleFilter";
import { UserTable } from "../components/UserTable";
import { Pagination } from "../components/Pagination";
import { UserModal } from "../components/UserModal";

const Home = () => {
  const [searchParams] = useSearchParams();
  const { data: users = [], isLoading } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const search = searchParams.get("search")?.toLowerCase() || "";
  const role = searchParams.get("role") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 5;

  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(search))
    .filter((user) => role === "all" || user.role === role);

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  return (
    <React.Fragment>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <div className="flex space-x-4 mb-4">
          <SearchInput />
          <RoleFilter />
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <UserTable users={paginatedUsers} onUserClick={setSelectedUser} />
            <Pagination
              totalItems={filteredUsers.length}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
        <UserModal
          isOpen={!!selectedUser}
          onRequestClose={() => setSelectedUser(null)}
          user={selectedUser}
        />
      </div>
    </React.Fragment>
  );
};

export default Home;
