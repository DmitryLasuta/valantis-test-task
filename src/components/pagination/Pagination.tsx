import { generatePagination } from '@/utils';
import styles from './styles.module.css';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const allPages = generatePagination(currentPage, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        className={styles.pagination__button}
        disabled={!canGoPrev}
        onClick={() => onPageChange(currentPage - 1)}
        type="button"
        aria-label="Go to previous page"
      >
        {'<'}
      </button>
      <ul className={styles['pagination__pages-list']}>
        {allPages.map((page, index) => (
          <li key={index}>
            <button
              className={styles.pagination__button}
              disabled={page === currentPage || typeof page === 'string'}
              onClick={() => onPageChange(Number(page))}
              type="button"
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
      <button
        className={styles.pagination__button}
        disabled={!canGoNext}
        onClick={() => onPageChange(currentPage + 1)}
        type="button"
        aria-label="Go to next page"
      >
        {'>'}
      </button>
      <p>
        Page {currentPage} of {totalPages}
      </p>
    </nav>
  );
};

export { Pagination };
