import styles from './styles.module.css';

const TheFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <p className={`${styles.footer__text} ${styles['footer__text--large']}`}>
          This project has been created like test task for Valantis
        </p>
        <p className={styles.footer__text}>
          Created by <span className={`${styles.footer__text} ${styles['footer__text--large']}`}>Dmitry Lasuta</span> in
          2024
        </p>
        <div className={styles.footer__links}>
          <p className={styles.footer__text}>Check it out on</p>
          <a
            className={styles.footer__link}
            href="https://github.com/DmitryLasuta/valantis-test-task"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export { TheFooter };
