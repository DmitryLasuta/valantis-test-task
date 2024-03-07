import styles from './FilterField.module.css';
import { useId } from 'react';

type FilterFieldProps = {
  value: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FilterField = ({ name, ...otherProps }: FilterFieldProps) => {
  const fieldId = useId();

  return (
    <>
      <label className={styles['filtering__field-label']} htmlFor={fieldId}>
        {name}
      </label>
      <input className={styles['filtering__input']} id={fieldId} name={name} type="text" {...otherProps} />
    </>
  );
};

export { FilterField };
