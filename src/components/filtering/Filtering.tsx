import { useRef, useState } from 'react';

import { storeAPI } from '@/shared/api/store';
import styles from './styles.module.css';
import { useMutation } from '@tanstack/react-query';

type FilteringProps = {
  setFilters: ({ filter, value }: { filter: string; value: string }) => void;
};

const Filtering = ({ setFilters }: FilteringProps) => {
  const [fields, setFields] = useState<string[]>([]);
  const [selectedField, setSelectedField] = useState<string>('none');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const wasFiltered = useRef(false);

  const mutation = useMutation({
    mutationFn: () => storeAPI.getFields(),
    onSuccess: data => {
      setFields(data);
    },
  });

  const handleSelectClick = () => {
    if (fields.length === 0) {
      mutation.mutate();
    }
  };

  const handleFieldChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedField(target.value);
    setSearchTerm('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilters({ filter: selectedField, value: searchTerm });
    wasFiltered.current = true;
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedField('none');
    setFilters({ filter: 'none', value: '' });
    wasFiltered.current = false;
  };

  return (
    <>
      <form className={styles.filtering} onSubmit={handleSubmit} onReset={handleReset}>
        <div className={styles.filtering__box}>
          <div className={styles.filtering__field}>
            <label className={styles.filtering__label} htmlFor="fields">
              Фильтры
            </label>
            <select
              className={styles.filtering__select}
              id="fields"
              onClick={handleSelectClick}
              onChange={handleFieldChange}
              value={selectedField}
            >
              <option value="none">Без фильтров</option>
              {fields.length > 0 ? (
                fields.map(field => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))
              ) : (
                <option value="none">Загрузка...</option>
              )}
            </select>
          </div>
          <input
            className={styles.filtering__input}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            type={selectedField !== 'price' ? 'text' : 'number'}
            min={selectedField === 'price' ? 0 : undefined}
            placeholder="Поиск"
            disabled={selectedField === 'none'}
            required
            role={selectedField !== 'none' ? 'search' : undefined}
            aria-label="Поиск"
          />
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
      <p className={styles.filtering__info}>
        {wasFiltered.current ? `Активные фильтр: ${selectedField} - ${searchTerm}` : 'Нет активных фильтров'}
      </p>
    </>
  );
};

export { Filtering };
