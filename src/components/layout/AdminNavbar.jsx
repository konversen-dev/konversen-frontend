import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import konversenLogo from "../../assets/logo/konversenLogo.png";
import { FiMenu, FiX } from "react-icons/fi";

export default function AdminNavbar({ adminName = "Admin", onLogout }) {
  const [openMenu, setOpenMenu] = useState(false); // desktop dropdown
  const [mobileMenu, setMobileMenu] = useState(false); // mobile menu
  const navigate = useNavigate();

  const initials = adminName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 relative z-30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* LOGO + TEXT */}
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={konversenLogo} alt="Konversen Logo" className="h-8 w-auto" />

          {/* Text Konversen (tampil di mobile & desktop) */}
          <h1 className="text-primary-light font-bold text-lg font-montserrat tracking-wide">
            Konversen
          </h1>
        </div>

        {/* DESKTOP DASHBOARD BUTTON */}
        <div className="hidden md:flex flex-1 justify-end mr-6">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="
              text-gray-800 font-semibold text-sm
              border-b-2 border-transparent hover:border-[#FF9E1C]
              pb-[2px] transition-all
            "
          >
            Dashboard Admin
          </button>
        </div>

        {/* DESKTOP AVATAR DROPDOWN */}
        <div className="hidden md:block relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-700">
              <span className="text-xs font-semibold">{initials}</span>
            </div>
            <span className="text-sm text-gray-700 font-medium">{adminName}</span>
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md text-sm z-40">
              <button
                onClick={() => {
                  navigate("/admin/profile");
                  setOpenMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </button>

              <button
                onClick={() => {
                  setOpenMenu(false);
                  onLogout();
                }}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setMobileMenu(true)}
        >
          <FiMenu />
        </button>
      </div>

      {/* MOBILE MENU SLIDE */}
      {mobileMenu && (
        <div className="fixed inset-0 bg-black/40 z-50 md:hidden">
          <div className="absolute right-0 top-0 w-64 h-full bg-white shadow-xl p-6 flex flex-col">

            {/* Close Button */}
            <button
              className="text-2xl mb-6 text-gray-600"
              onClick={() => setMobileMenu(false)}
            >
              <FiX />
            </button>

            {/* Avatar */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 font-semibold">
                {initials}
              </div>
              <span className="text-sm font-medium text-gray-800">
                {adminName}
              </span>
            </div>

            {/* MENU ITEMS */}
            <div className="flex flex-col gap-4 text-sm font-semibold">

              <button
                onClick={() => {
                  navigate("/admin/dashboard");
                  setMobileMenu(false);
                }}
                className="text-left"
              >
                Dashboard Admin
              </button>

              <button
                onClick={() => {
                  navigate("/admin/profile");
                  setMobileMenu(false);
                }}
                className="text-left"
              >
                Profile
              </button>

              <button
                onClick={() => {
                  setMobileMenu(false);
                  onLogout();
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
