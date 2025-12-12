import React, { useState, useEffect } from "react";

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [pageRange, setPageRange] = useState({ start: 1, end: 1 });

  // Hitung range item yang sedang ditampilkan
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);


  const maxVisiblePages = 5; // Jumlah maksimum halaman yang ditampilkan
  const ellipsisThreshold = 2; // Jarak dari ujung untuk menampilkan ellipsis

  useEffect(() => {
    if (totalPages <= maxVisiblePages) {
      // Jika total halaman sedikit, tampilkan semua
      setPageRange({ start: 1, end: totalPages });
    } else {
      let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let end = start + maxVisiblePages - 1;

      if (end > totalPages) {
        end = totalPages;
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      setPageRange({ start, end });
    }
  }, [currentPage, totalPages, maxVisiblePages]);

  const handleFirst = () => onPageChange(1);
  const handlePrev = () => onPageChange(Math.max(currentPage - 1, 1));
  const handleNext = () => onPageChange(Math.min(currentPage + 1, totalPages));
  const handleLast = () => onPageChange(totalPages);

  const renderPageNumbers = () => {
    const pages = [];

    // Selalu tampilkan halaman pertama
    pages.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={`px-3 py-1 border rounded-md ${
          1 === currentPage
            ? "bg-blue-500 text-white border-blue-500"
            : "text-blue-500 border-blue-300 hover:bg-blue-50"
        }`}
      >
        1
      </button>
    );

    // Tambahkan ellipsis jika perlu di awal
    if (pageRange.start > ellipsisThreshold + 1) {
      pages.push(
        <span key="start-ellipsis" className="px-2 py-1 text-gray-500">
          ...
        </span>
      );
    }

    // Tampilkan halaman di range yang ditentukan (kecuali halaman pertama dan terakhir)
    for (let i = Math.max(2, pageRange.start); i <= Math.min(totalPages - 1, pageRange.end); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 border rounded-md ${
            i === currentPage
              ? "bg-blue-500 text-white border-blue-500"
              : "text-blue-500 border-blue-300 hover:bg-blue-50"
          }`}
        >
          {i}
        </button>
      );
    }

    // Tambahkan ellipsis jika perlu di akhir
    if (pageRange.end < totalPages - ellipsisThreshold) {
      pages.push(
        <span key="end-ellipsis" className="px-2 py-1 text-gray-500">
          ...
        </span>
      );
    }

    // Selalu tampilkan halaman terakhir jika lebih dari 1 halaman
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`px-3 py-1 border rounded-md ${
            totalPages === currentPage
              ? "bg-blue-500 text-white border-blue-500"
              : "text-blue-500 border-blue-300 hover:bg-blue-50"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  // Jika tidak ada data, jangan tampilkan pagination
  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-4 border-t border-gray-200 pt-3">
      {/* Left side: item count */}
      <p className="text-sm text-gray-600 mb-2 md:mb-0">
        {startItem}-{endItem} of {totalItems} items
      </p>

      {/* Center: pagination controls */}
      <div className="flex items-center gap-1 text-sm flex-wrap justify-center">
        <button
          onClick={handleFirst}
          disabled={currentPage === 1}
          className={`px-2 py-1 border rounded-md ${
            currentPage === 1
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-blue-500 border-blue-300 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          « First
        </button>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-2 py-1 border rounded-md ${
            currentPage === 1
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-blue-500 border-blue-300 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          ‹ Prev
        </button>

        {/* Page numbers dengan pagination cerdas */}
        {renderPageNumbers()}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 border rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-blue-500 border-blue-300 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          Next ›
        </button>
        <button
          onClick={handleLast}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 border rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-blue-500 border-blue-300 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          Last »
        </button>
      </div>

      {/* Right side: items per page */}
      <div className="flex items-center gap-2 mt-2 md:mt-0">
        <div className="relative">
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none bg-white"
          >
            {[5, 10, 25, 50, 100].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <span className="text-sm text-gray-600">items per page</span>
      </div>
    </div>
  );
}