import { FilterField, Filtering, Pagination, Products } from './components';
import { useRef, useState } from 'react';

import { ITEMS_PER_PAGE } from './shared/constants';
import { PageLayout } from './components/ui';
import type { ProductExcludingId } from './types';
import { QUERY_KEYS } from './shared/constants/queryKeys';
import { storeAPI } from './shared/api/store';
import { useQueries } from '@tanstack/react-query';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const filters = useRef<Partial<ProductExcludingId>>({});

  const [fieldsQuery, identifiersQuery] = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEYS.FIELDS],
        queryFn: () => storeAPI.getFields(),
        staleTime: Infinity,
      },
      {
        queryKey: [QUERY_KEYS.PRODUCT_IDENTIFIERS],
        queryFn: () => {
          if (Object.keys(filters.current).length === 0) {
            return storeAPI.getIdentifiers();
          }
          return storeAPI.getIdentifiers({
            ...filters.current,
          });
        },
        staleTime: Infinity,
      },
    ],
  });

  const isError = fieldsQuery.isError || identifiersQuery.isError;
  const isPending = fieldsQuery.isPending || identifiersQuery.isPending;

  const handleFiltering = (params: Partial<ProductExcludingId>) => {
    filters.current = params;
    setCurrentPage(1);
    identifiersQuery.refetch();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isPending || !identifiersQuery.data || !fieldsQuery.data)
    return (
      <PageLayout>
        <p>Loading...</p>
      </PageLayout>
    );
  if (isError) return <div>Error</div>;
  const totalPages = Math.ceil(identifiersQuery.data.length / ITEMS_PER_PAGE);

  return (
    <PageLayout>
      <Filtering setFilters={handleFiltering}>
        {fieldsQuery.data.map(field => (
          <FilterField key={field} name={field} value={String(filters.current[field as keyof ProductExcludingId])} />
        ))}
      </Filtering>
      <Products
        identifiers={identifiersQuery.data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)}
      />
      {totalPages > 1 && (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </PageLayout>
  );
}

export { App };
