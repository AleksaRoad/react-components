import type { FC } from 'react';
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
    <div className="flex flex-wrap items-center justify-center gap-5">
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
