import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("page", page.toString());
    setSearchParams(currentParams);
  };

    // Calculate visible page range (show up to 5 pages at a time)
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages);
    }
    
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 4, 1);
    }
  return (
    <React.Fragment>
    <div className="flex items-center justify-center mt-8">
      <nav className="flex items-center space-x-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>

        {/* First page */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                currentPage === 1 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              1
            </button>
            {startPage > 2 && (
              <span className="w-10 h-10 flex items-center justify-center text-gray-500">
                ...
              </span>
            )}
          </>
        )}

        {/* Page numbers */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Last page */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="w-10 h-10 flex items-center justify-center text-gray-500">
                ...
              </span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                currentPage === totalPages 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </nav>
    </div>
    </React.Fragment>
  );
};
