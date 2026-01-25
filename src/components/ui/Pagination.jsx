import PropTypes from "prop-types";
import { useMemo } from "react";

/**
 * Pagination - A reusable pagination component with Bootstrap styling.
 * Supports customizable page range and responsive design.
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  showFirstLast = true,
  className = "",
  size = "md",
}) => {
  // Generate page numbers to display
  const pageNumbers = useMemo(() => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // Adjust if we're near the start or end
    if (currentPage <= halfVisible) {
      endPage = maxVisiblePages;
    } else if (currentPage >= totalPages - halfVisible) {
      startPage = totalPages - maxVisiblePages + 1;
    }

    const pages = [];

    // Add first page and ellipsis
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    // Add visible page range
    for (let i = startPage; i <= endPage; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Add ellipsis and last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages, maxVisiblePages]);

  const handlePageClick = (page) => {
    if (
      page !== "..." &&
      page !== currentPage &&
      page >= 1 &&
      page <= totalPages
    ) {
      onPageChange(page);
    }
  };

  const getSizeClass = () => {
    const sizes = {
      sm: "pagination-sm",
      md: "",
      lg: "pagination-lg",
    };
    return sizes[size] || "";
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Page navigation" className={className}>
      <ul
        className={`pagination justify-content-center mb-0 ${getSizeClass()}`}
      >
        {/* First page button */}
        {showFirstLast && (
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageClick(1)}
              disabled={currentPage === 1}
              aria-label="First page"
            >
              <i className="bi bi-chevron-double-left"></i>
            </button>
          </li>
        )}

        {/* Previous button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Previous
          </button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((page, index) => (
          <li
            key={page === "..." ? `ellipsis-${index}` : page}
            className={`page-item ${page === currentPage ? "active" : ""} ${page === "..." ? "disabled" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageClick(page)}
              disabled={page === "..."}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next button */}
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </li>

        {/* Last page button */}
        {showFirstLast && (
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageClick(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="Last page"
            >
              <i className="bi bi-chevron-double-right"></i>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  maxVisiblePages: PropTypes.number,
  showFirstLast: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Pagination;
