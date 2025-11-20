import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token atau session user
    localStorage.removeItem("token");

    // Arahkan ke halaman login
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Kiri - Logo */}
        <div className="flex items-center space-x-2">
          <h1 className="text-primary-light font-bold text-lg font-montserrat">
            Conversify
          </h1>
        </div>

        {/* Tengah - Menu */}
        <div className="flex items-center space-x-8 ml-auto mr-6">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `relative pb-1 text-sm font-semibold transition ${
                isActive
                  ? "text-gray-700 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-primary-light"
                  : "text-gray-700 hover:text-primary-light"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/campaign-sales"
            className={({ isActive }) =>
              `relative pb-1 text-sm font-semibold transition ${
                isActive
                  ? "text-gray-700 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-primary-light"
                  : "text-gray-700 hover:text-primary-light"
              }`
            }
          >
            Campaign
          </NavLink>
        </div>

        {/* Kanan - User Dropdown */}
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 font-bold cursor-pointer hover:bg-gray-200"
          >
            U
          </div>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border z-50">
              <button
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Profil
              </button>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
