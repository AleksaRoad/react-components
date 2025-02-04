import type { FC } from 'react';
import { ErrorBoundaryButton } from '@/components/ErrorBoundary';
import { PaginationControl } from '@/components/Footer';

type FooterProps = {
  showPagination: boolean;
  currentPage: number;
  totalPages: number;
  onPreviousPage: (num: number) => void;
  handlePageChange: (num: number) => void;
};

export const Footer: FC<FooterProps> = ({
  showPagination,
  currentPage,
  totalPages,
  onPreviousPage,
  handlePageChange,
}) => {
  return (
    <footer className="mt-auto flex flex-wrap items-center justify-center gap-5">
      {showPagination && (
        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousPage={() => onPreviousPage(currentPage - 1)}
          onNextPage={() => handlePageChange(currentPage + 1)}
        />
      )}
      <ErrorBoundaryButton />
    </footer>
  );
};
