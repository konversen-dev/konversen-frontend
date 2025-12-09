import React from "react";

export default function CampaignFilterBar({
  search,
  setSearch,
  filters,
  setFilters,
  statusOptions = []
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm shadow-gray-300 px-4 py-4 mb-4">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* SEARCH FIELD */}
        <div className="flex-1 relative w-full md:mt-[18px]">
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search campaign..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        {/* FILTER WRAPPER */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">

          {/* START DATE */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-600 mb-1">Start Period</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, startDate: e.target.value }))
              }
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-primary-light"
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
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-primary-light"
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
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-primary-light"
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
