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
        className="hover:bg-blue-md w-20 cursor-pointer rounded-xl border-none bg-white py-1.5 text-black transition-colors duration-200 ease-in-out hover:text-white disabled:pointer-events-none disabled:opacity-50"
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
        className="hover:bg-blue-md w-20 cursor-pointer rounded-xl border-none bg-white py-1.5 text-black transition-colors duration-200 ease-in-out hover:text-white disabled:pointer-events-none disabled:opacity-50"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
