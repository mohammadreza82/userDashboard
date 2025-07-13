import { useSearchParams } from 'react-router-dom';

export const RoleFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const role = searchParams.get('role') || 'all';

  const handleRoleChange = (newRole: string) => {
    const currentParams = new URLSearchParams(searchParams);
    if (newRole === 'all') {
      currentParams.delete('role');
    } else {
      currentParams.set('role', newRole);
    }
    setSearchParams(currentParams);
  };

  return (
    <select
      value={role}
      onChange={(e) => handleRoleChange(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="all">All Roles</option>
      <option value="admin">Admin</option>
      <option value="user">User</option>
      <option value="guest">Guest</option>
    </select>
  );
};