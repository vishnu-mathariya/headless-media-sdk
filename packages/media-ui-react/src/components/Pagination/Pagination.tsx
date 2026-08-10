export interface PaginationProps {
  page: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  hasNextPage,
  onPageChange
}: PaginationProps) {
  return (
    <nav
      className="media-pagination"
      aria-label="Media pagination"
    >
      <button
        type="button"
        disabled={page <= 1}
        onClick={() =>
          onPageChange(page - 1)
        }
      >
        Previous
      </button>

      <span>
        Page {page}
      </span>

      <button
        type="button"
        disabled={!hasNextPage}
        onClick={() =>
          onPageChange(page + 1)
        }
      >
        Next
      </button>
    </nav>
  );
}