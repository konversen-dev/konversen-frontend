import React from "react";

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleFirst = () => onPageChange(1);
  const handlePrev = () => onPageChange(Math.max(currentPage - 1, 1));
  const handleNext = () => onPageChange(Math.min(currentPage + 1, totalPages));
  const handleLast = () => onPageChange(totalPages);

  // Hitung range item yang sedang ditampilkan
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-4 border-t border-gray-200 pt-3">
      {/* Left side: item count */}
      <p className="text-sm text-gray-600 mb-2 md:mb-0">
        {startItem}-{endItem} of {totalItems} items
      </p>

      {/* Center: pagination controls */}
      <div className="flex items-center gap-1 text-sm">
        <button
          onClick={handleFirst}
          disabled={currentPage === 1}
          className={`px-2 py-1 border rounded-md ${
            currentPage === 1
              ? "text-gray-400 border-gray-200"
              : "text-blue-500 border-blue-300 hover:bg-blue-50"
          }`}
        >
          « First
        </button>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-2 py-1 border rounded-md ${
            currentPage === 1
              ? "text-gray-400 border-gray-200"
              : "text-blue-500 border-blue-300 hover:bg-blue-50"
          }`}
        >
          ‹ Prev
        </button>

        {/* Page numbers */}
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 border rounded-md ${
                page === currentPage
                  ? "bg-blue-500 text-white border-blue-500"
                  : "text-blue-500 border-blue-300 hover:bg-blue-50"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 border rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-200"
              : "text-blue-500 border-blue-300 hover:bg-blue-50"
          }`}
        >
          Next ›
        </button>
        <button
          onClick={handleLast}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 border rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-200"
              : "text-blue-500 border-blue-300 hover:bg-blue-50"
          }`}
        >
          Last »
        </button>
      </div>

      {/* Right side: items per page */}
      <div className="flex items-center gap-2 mt-2 md:mt-0">
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {[5, 10, 15, 20].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-600">items per page</span>
      </div>
    </div>
  );
}
