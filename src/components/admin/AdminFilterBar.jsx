// src/components/admin/AdminFilterBar.jsx
import React from "react";
import { FiSearch } from "react-icons/fi";
import CustomDropdown from "../utils/CustomDropdown";

export default function AdminFilterBar({ onSearchChange, onFilterChange }) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 mb-6 shadow-gray-300">

      {/* FLEX WRAPPER UTAMA */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">

        {/* SEARCH FIELD */}
        <div className="relative w-full md:flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search here..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 
                       text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        {/* ROLE */}
        <div className="w-full md:w-40">
          <CustomDropdown
            options={["Role", "Sales", "Manager", "Admin"]}
            defaultValue="Role"
            onChange={(value) =>
              onFilterChange("role", value === "Role" ? "" : value)
            }
          />
        </div>

        {/* STATUS */}
        <div className="w-full md:w-40">
          <CustomDropdown
            options={["Status", "Active", "Non Active"]}
            defaultValue="Status"
            onChange={(value) =>
              onFilterChange("status", value === "Status" ? "" : value)
            }
          />
        </div>

      </div>
    </div>
  );
}
