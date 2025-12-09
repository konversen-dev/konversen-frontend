import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import konversenLogo from "../../assets/logo/konversenLogo.png";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false); // desktop profile dropdown
  const [mobileMenu, setMobileMenu] = useState(false); // mobile menu toggle
  const navigate = useNavigate();

  const role = localStorage.getItem("role") || "sales";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* LOGO + TEXT */}
        <div
          onClick={() => navigate(`/${role}/dashboard`)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={konversenLogo} alt="Konversen" className="h-8 w-auto" />
          <span className="text-primary-light font-bold text-lg font-montserrat">
            Konversen
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-8 ml-auto mr-6">

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
                      ? "text-primary-light after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[50%] after:h-[3px] after:bg-primary-light"
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
                      ? "text-primary-light after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[50%] after:h-[3px] after:bg-primary-light"
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
                      ? "text-primary-light after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[50%] after:h-[3px] after:bg-primary-light"
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
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `relative pb-1 text-sm font-semibold ${
                  isActive
                    ? "text-primary-light after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[50%] after:h-[3px] after:bg-primary-light"
                    : "text-gray-700 hover:text-primary-light"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
        </div>

        {/* DESKTOP PROFILE ICON */}
        <div className="hidden md:block relative">
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

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setMobileMenu(true)}
        >
          <FiMenu />
        </button>
      </div>

      {/* MOBILE SLIDE MENU */}
      {mobileMenu && (
        <div className="fixed inset-0 bg-black/40 z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl p-6 flex flex-col animate-slide-left">

            {/* Close Button */}
            <button
              className="text-2xl text-gray-600 mb-6"
              onClick={() => setMobileMenu(false)}
            >
              <FiX />
            </button>

            {/* Menu Items */}
            <div className="flex flex-col space-y-4 text-sm font-semibold">

              <button
                onClick={() => {
                  navigate(`/${role}/dashboard`);
                  setMobileMenu(false);
                }}
                className="text-left"
              >
                Dashboard
              </button>

              {(role === "sales" || role === "manager") && (
                <button
                  onClick={() => {
                    navigate(`/${role}/campaign`);
                    setMobileMenu(false);
                  }}
                  className="text-left"
                >
                  Campaign
                </button>
              )}

              <button
                onClick={() => {
                  navigate(`/${role}/profile`);
                  setMobileMenu(false);
                }}
                className="text-left"
              >
                Profile
              </button>

              <button
                onClick={() => {
                  setMobileMenu(false);
                  handleLogout();
                }}
                className="text-left text-red-600"
              >
                Logout
              </button>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
