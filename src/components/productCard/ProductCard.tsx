import type { Product } from '@/types';
import styles from './styles.module.css';

const ProductCard = ({ product }: { product: Product }) => {
  const { id, brand, price, product: productName } = product;

  return (
    <article className={styles['product-card']}>
      <header>
        <h3 className={styles['product-card__name']}>
          {productName ?? 'No name'} | ID: {id}
        </h3>
        <p className={styles['product-card__brand']}>Brand: {brand ?? 'No brand'}</p>
      </header>
      <p className={styles['product-card__price']}>Price: ${price ?? 'No price'}</p>
    </article>
  );
};

export { ProductCard };
