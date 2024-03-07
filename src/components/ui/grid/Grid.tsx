import { Children } from 'react';
import styles from './styles.module.css';

const Grid = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className={styles.grid}>
      {Children.map(children, child => (
        <li className={styles.grid__item}>{child}</li>
      ))}
    </ul>
  );
};

export { Grid };
