import React, { useState } from "react";

export default function AdminNavbar({
  adminName = "Admin",
  onProfile,
  onLogout,
}) {
  const [openMenu, setOpenMenu] = useState(false);

  const initials = adminName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 relative z-30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo kiri */}
        <div className="flex items-center space-x-2">
          <h1 className="text-primary-light font-bold text-lg font-montserrat">
            Conversify
          </h1>
        </div>

        {/* Tulisan Dashboard Admin di kanan */}
        <div className="flex-1 flex justify-end mr-6">
          <span
            className="
              text-gray-800 
              font-semibold text-sm
              border-b-2 border-transparent
              hover:border-[#FF9E1C]
              pb-[2px]
              transition-all
              cursor-default
            "
          >
            Dashboard Admin
          </span>
        </div>

        {/* Avatar + dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenMenu((x) => !x)}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 bg-white">
              <span className="text-xs font-semibold">{initials}</span>
            </div>
            <span className="hidden sm:inline text-sm text-gray-700 font-medium">
              {adminName}
            </span>
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md text-sm z-40">
              <button
                type="button"
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  setOpenMenu(false);
                  onProfile && onProfile(); // ⬅️ buka modal profile di AdminDashboard
                }}
              >
                Profile
              </button>
              <button
                type="button"
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                onClick={() => {
                  setOpenMenu(false);
                  onLogout && onLogout(); // ⬅️ buka modal logout di AdminDashboard
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
