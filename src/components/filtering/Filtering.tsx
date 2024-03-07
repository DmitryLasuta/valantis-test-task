import { Children, cloneElement, isValidElement, useState } from 'react';

import type { ProductExcludingId } from '@/types';
import styles from './Filtering.module.css';

type FilteringProps = {
  children: React.ReactNode;
  setFilters: (params: Partial<ProductExcludingId>) => void;
};

const Filtering = ({ setFilters, children }: FilteringProps) => {
  const [searchParams, setSearchParams] = useState<Partial<ProductExcludingId>>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilters({
      ...searchParams,
      price: Number(searchParams.price) ? Number(searchParams.price) : undefined,
    });
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, [event.target.name]: event.target.value });
  };

  return (
    <form className={styles.filtering} onSubmit={handleSubmit}>
      <div className={styles.filtering__box}>
        <fieldset className={styles.filtering__fieldset}>
          <legend className={styles['filtering__fieldset-legend']}>Фильтры</legend>
          {Children.map(children, child =>
            isValidElement(child)
              ? cloneElement(child, {
                  ...child.props,
                  value: searchParams[child.props.value as keyof ProductExcludingId],
                  onChange: handleChange,
                })
              : null
          )}
        </fieldset>
      </div>
      <div className={styles.filtering__buttons}>
        <button className={styles.filtering__button} type="submit">
          Поиск
        </button>
        <button className={styles.filtering__button} type="reset">
          Сброс
        </button>
      </div>
    </form>
  );
};

export { Filtering };
