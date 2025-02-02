export interface FooterProps {
  showPagination: boolean;
  currentPage: number;
  totalPages: number;
  onPreviousPage: (num: number) => void;
  handlePageChange: (num: number) => void;
}
