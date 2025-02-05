type PaginationControlProps = {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export const PaginationControl = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}: PaginationControlProps) => {
  return (
    <div className="my-5 flex items-center justify-center gap-2">
      <button
        className="sm:hover:bg-blue-md focus:outline-blue-xs w-20 cursor-pointer rounded-xl border-none bg-white py-1.5 text-black transition-colors duration-200 ease-in-out active:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 sm:hover:text-white"
        onClick={onPreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <div className="flex w-32 items-center justify-center text-white">
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
      <button
        className="sm:hover:bg-blue-md focus:outline-blue-xs w-20 cursor-pointer rounded-xl border-none bg-white py-1.5 text-black transition-colors duration-200 ease-in-out active:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 sm:hover:text-white"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
