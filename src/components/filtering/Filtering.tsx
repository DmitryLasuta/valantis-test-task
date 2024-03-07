import { storeAPI } from '@/shared/api/store';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

type FilteringProps = {
  setFilters: ({ filter, value }: { filter: string; value: string }) => void;
};

const Filtering = ({ setFilters }: FilteringProps) => {
  const [fields, setFields] = useState<string[]>([]);
  const [selectedField, setSelectedField] = useState<string>('none');
  const [searchTerm, setSearchTerm] = useState<string>('');

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
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilters({ filter: selectedField, value: searchTerm });
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedField('none');
    setFilters({ filter: 'none', value: '' });
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <label htmlFor="fields">Фильтры</label>
      <select id="fields" onClick={handleSelectClick} onChange={handleFieldChange} value={selectedField}>
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
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        type={selectedField !== 'price' ? 'text' : 'number'}
        min={selectedField === 'price' ? 0 : undefined}
        placeholder="Поиск"
        disabled={selectedField === 'none'}
      />
      <button type="submit">Поиск</button>
      <button type="reset">Сброс</button>
    </form>
  );
};

export { Filtering };
