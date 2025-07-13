import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { User } from "../types/user";

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  // Add Random role for user
  return data.map((user: any) => ({
    ...user,
    role: ["admin", "user", "guest"][Math.floor(Math.random() * 3)] as
      | "admin"
      | "user"
      | "guest",
  }));
};

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
