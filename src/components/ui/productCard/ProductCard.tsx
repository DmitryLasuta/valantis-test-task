import type { Product } from '@/types';
import styles from './styles.module.css';

const ProductCard = ({ product }: { product: Product }) => {
  const { brand, price, product: productName, id } = product;

  return (
    <article className={styles['product-card']}>
      <header>
        <h3 className={styles['product-card__name']}>{productName}</h3>
        <p className={styles['product-card__brand']}>Бренд: {brand ?? 'не указан'}</p>
        <p>id: {id}</p>
      </header>
      <p className={styles['product-card__price']}>Цена: {price}</p>
    </article>
  );
};

export { ProductCard };
