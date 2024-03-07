import { TheFooter } from '@/components/ui';
import styles from './styles.module.css';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.header__title}>Товары на складе Valantis</h1>
      </header>
      <main className={styles.main}>{children}</main>
      <TheFooter />
    </>
  );
};

export { PageLayout };
