import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const SearchInput: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams);
    if (search) {
      currentParams.set('search', search);
    } else {
      currentParams.delete('search');
    }
    setSearchParams(currentParams);
  }, [search, setSearchParams]);

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search by name..."
      className="p-2 border rounded w-full max-w-xs"
    />
  );
};