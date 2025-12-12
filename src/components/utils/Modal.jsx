import React from "react";
import { FiX } from "react-icons/fi";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">
      
      {/* MODAL PANEL */}
      <div className="
        bg-white rounded-2xl w-full max-w-5xl
        max-h-[100vh] h-auto
        overflow-hidden relative
      ">
        
        {/* HEADER (TIPIS) */}
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <h2 className="text-sm font-semibold text-gray-800">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <FiX className="text-gray-500" />
          </button>
        </div>

        {/* CONTENT (SCROLL DI SINI) */}
        <div className="p-5 overflow-y-auto max-h-[calc(85vh-56px)]">
          {children}
        </div>

      </div>
    </div>
  );
}
