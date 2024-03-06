import { Pagination, Products } from './components';

import { ITEMS_PER_PAGE } from './shared/constants';
import { QUERY_KEYS } from './shared/constants/queryKeys';
import { storeAPI } from './shared/api/store';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: identifiers, isPending } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT_IDENTIFIERS],
    queryFn: () => storeAPI.getIdentifiers(),
    staleTime: Infinity,
  });

  if (isPending || !identifiers) return <div>Loading...</div>;

  const totalPages = Math.ceil(identifiers.length / ITEMS_PER_PAGE);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <Products identifiers={identifiers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)} />
    </div>
  );
}

export { App };
