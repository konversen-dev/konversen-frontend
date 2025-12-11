import React from "react";
import { FiSearch } from "react-icons/fi";

export default function CampaignFilterBar({
  search,
  setSearch,
  filters,
  setFilters,
  statusOptions = []
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm shadow-gray-300 p-4 mb-6">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {/* SEARCH FIELD */}
        <div className="flex-1 min-w-[280px]">
          <label className="text-xs text-gray-600 mb-1 block">Search Campaign Name</label>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="text"
              placeholder="Search campaign..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
          </div>
        </div>

        {/* FILTER WRAPPER */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-2">

          {/* START DATE */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-600 mb-1">Start Period</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, startDate: e.target.value }))
              }
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
          </div>

          {/* END DATE */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-600 mb-1">End Period</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, endDate: e.target.value }))
              }
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
          </div>

          {/* STATUS */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-600 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
            >
              <option value="">All</option>
              {statusOptions.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>
    </div>
  );
}
