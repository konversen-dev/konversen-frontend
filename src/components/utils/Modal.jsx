import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // modal hanya muncul jika `isOpen = true`

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-lg relative">
        {/* Tombol close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ×
        </button>

        {/* Konten modal */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
