import PropTypes from "prop-types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/Pagination";

export default function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) {
  console.log(currentPage, totalPages);
  const renderPageNumbers = () => {
    let pages = [];

    if (totalPages <= maxVisiblePages) {
      pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "…", totalPages];
      } else if (currentPage > totalPages - 3) {
        pages = [
          1,
          "…",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [
          1,
          "…",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "…",
          totalPages,
        ];
      }
    }

    return pages.map((page, index) => (
      <PaginationItem key={ index }>
        { page === "…" ? (
          <PaginationEllipsis />
        ) : (
          <PaginationLink
            onClick={ () => onPageChange(page) }
            isActive={ currentPage === page }
          >
            { page }
          </PaginationLink>
        ) }
      </PaginationItem>
    ));
  };

  return (
    <Pagination className="py-5">
      <PaginationContent className="hover:cursor-pointer">
        <PaginationItem>
          <PaginationPrevious
            onClick={ () => onPageChange(currentPage > 1 ? currentPage - 1 : 1) }
            className={
              currentPage === 1 ? "opacity-50 hover:cursor-default" : ""
            }
          />
        </PaginationItem>
        { renderPageNumbers() }
        <PaginationItem>
          <PaginationNext
            onClick={ () =>
              onPageChange(
                currentPage < totalPages ? currentPage + 1 : totalPages
              )
            }
            className={
              currentPage === totalPages
                ? "opacity-50 hover:cursor-default"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

CustomPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  maxVisiblePages: PropTypes.number,
};
