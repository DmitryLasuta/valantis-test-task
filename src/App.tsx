import { Filtering, Pagination, Products } from './components';
import { useRef, useState } from 'react';

import { ITEMS_PER_PAGE } from './shared/constants';
import { PageLayout } from './components/ui';
import { QUERY_KEYS } from './shared/constants/queryKeys';
import { storeAPI } from './shared/api/store';
import { useQuery } from '@tanstack/react-query';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const filters = useRef({
    filter: 'none',
    value: '',
  });
  const {
    data: identifiers,
    isPending,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT_IDENTIFIERS],
    queryFn: () => {
      const { filter, value } = filters.current;
      if (filter === 'none') {
        return storeAPI.getIdentifiers();
      }
      return storeAPI.getIdentifiers({
        [filter]: filter === 'price' ? Number(value) : value,
      });
    },
    staleTime: Infinity,
  });

  const haleFilters = (params: { filter: string; value: string }) => {
    filters.current = params;
    setCurrentPage(1);
    refetch();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isPending || !identifiers) return <div>Loading...</div>;
  const totalPages = Math.ceil(identifiers.length / ITEMS_PER_PAGE);

  return (
    <PageLayout>
      <Filtering setFilters={haleFilters} />
      <Products identifiers={identifiers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)} />
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </PageLayout>
  );
}

export { App };
