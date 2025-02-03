import type { FC } from 'react';
import styles from './Footer.module.css';
import type { FooterProps } from './types';
import { ErrorBoundaryButton } from '@/components/ErrorBoundary';
import { PaginationControl } from '@/components/Footer';

export const Footer: FC<FooterProps> = ({
  showPagination,
  currentPage,
  totalPages,
  onPreviousPage,
  handlePageChange,
}) => {
  return (
    <div className={styles.footer}>
      {showPagination && (
        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousPage={() => onPreviousPage(currentPage - 1)}
          onNextPage={() => handlePageChange(currentPage + 1)}
        />
      )}
      <ErrorBoundaryButton />
    </div>
  );
};
