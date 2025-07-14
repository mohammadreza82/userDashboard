export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: {
      name: string;
    };
    role: 'admin' | 'user' | 'guest';
  }

  export interface UserTableProps {
    users: User[];
    onUserClick: (user: User) => void;
  }
  