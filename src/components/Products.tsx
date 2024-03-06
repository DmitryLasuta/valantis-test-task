import { Grid } from './ui';
import { ProductCard } from './productCard';
import { QUERY_KEYS } from '@/shared/constants';
import { storeAPI } from '@/shared/api/store';
import { useQuery } from '@tanstack/react-query';

const Products = ({ identifiers }: { identifiers: string[] }) => {
  const {
    data: products,
    isPending,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, identifiers],
    queryFn: () => storeAPI.getProducts(identifiers),
  });

  if (!products || isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <Grid>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export { Products };
