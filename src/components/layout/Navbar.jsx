import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role") || "sales";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <h1 className="text-primary-light font-bold text-lg font-montserrat">
          Conversify
        </h1>

        {/* MENU */}
        <div className="flex items-center space-x-8 ml-auto mr-6">

          {/* SALES MENU */}
          {role === "sales" && (
            <>
              <NavLink
                to="/sales/dashboard"
                className={({ isActive }) =>
                  `relative pb-1 text-sm font-semibold ${
                    isActive
                      ? "text-primary-light after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[50%] after:h-[3px] after:bg-primary-light after:rounded-full"
                      : "text-gray-700 hover:text-primary-light"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/sales/campaign"
                className={({ isActive }) =>
                  `relative pb-1 text-sm font-semibold ${
                    isActive
                      ? "text-primary-light after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[50%] after:h-[3px] after:bg-primary-light after:rounded-full"
                      : "text-gray-700 hover:text-primary-light"
                  }`
                }
              >
                Campaign
              </NavLink>
            </>
          )}

          {/* MANAGER MENU */}
          {role === "manager" && (
            <>
              <NavLink
                to="/manager/dashboard"
                className={({ isActive }) =>
                  `relative pb-1 text-sm font-semibold ${
                    isActive
                      ? "text-primary-light after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[50%] after:h-[3px] after:bg-primary-light after:rounded-full"
                      : "text-gray-700 hover:text-primary-light"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/manager/campaign"
                className={({ isActive }) =>
                  `relative pb-1 text-sm font-semibold ${
                    isActive
                      ? "text-primary-light after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[50%] after:h-[3px] after:bg-primary-light after:rounded-full"
                      : "text-gray-700 hover:text-primary-light"
                  }`
                }
              >
                Campaign
              </NavLink>
            </>
          )}

          {/* ADMIN MENU */}
          {role === "admin" && (
            <>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `relative pb-1 text-sm font-semibold ${
                    isActive
                      ? "text-primary-light after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[50%] after:h-[3px] after:bg-primary-light after:rounded-full"
                      : "text-gray-700 hover:text-primary-light"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </>
          )}
        </div>

        {/* USER MENU DROPDOWN */}
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
                  navigate(`/${role}/profile`);
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Profile
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
