import styles from './PaginationControl.module.css';
import type { PaginationControlProps } from './types';

export const PaginationControl = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}: PaginationControlProps) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={onPreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <div className={styles.pageInfo}>
        Page<span className={styles.currentPage}>{currentPage}</span>of
        <span className={styles.totalPages}>{totalPages}</span>
      </div>
      <button
        className={styles.button}
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
