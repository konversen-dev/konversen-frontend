import React from "react";
import { useNavigate } from "react-router-dom";
import loginIllustration from "../assets/sales/login-illustration.png";
import konversenLogo from "../assets/logo/konversenLogo.png";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value.toLowerCase();

    let role = "sales";
    if (email.includes("admin")) role = "admin";
    else if (email.includes("manager")) role = "manager";

    localStorage.setItem("role", role);

    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "manager") navigate("/manager/dashboard");
    else navigate("/sales/dashboard");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen font-lato">

      {/* MOBILE HEADER (LOGO + ILLUSTRATION) */}
      <div className="md:hidden w-full bg-secondary-light relative px-6 pt-6 pb-4">
        
        {/* Logo pojok kanan */}
        <img
          src={konversenLogo}
          alt="Konversen Logo"
          className="h-10 absolute right-6 top-4"
        />

        {/* Illustration */}
        <div className="flex justify-center mt-10">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="max-w-xs w-full"
          />
        </div>
      </div>

      {/* LEFT SIDE — FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 bg-white">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold mb-1 text-primary-light font-montserrat">
            Welcome Back
          </h1>
          <p className="text-primary-dark mb-8">Please enter your details!</p>

          <form onSubmit={handleLogin} className="flex flex-col space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-primary-darkest mb-1">
                Email*
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full border text-sm border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-primary-darkest mb-1">
                Password*
              </label>
              <input
                type="password"
                placeholder="Your Password"
                className="w-full border text-sm border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
            </div>

            <button
              type="submit"
              className="bg-primary-light text-white font-semibold py-2 rounded-lg hover:bg-orange-500 transition"
            >
              Login
            </button>
          </form>

          <footer className="text-sm text-center text-primary-dark mt-10 md:mt-20">
            © 2025 Konversen all rights reserved
          </footer>
        </div>
      </div>

      {/* RIGHT SIDE — DESKTOP ONLY */}
      <div className="hidden md:flex w-1/2 bg-secondary-light relative flex-col justify-center items-center px-12">

        {/* Logo pojok kanan */}
        <img
          src={konversenLogo}
          alt="Konversen Logo"
          className="h-12 absolute right-6 top-6"
        />

        {/* Illustration */}
        <img
          src={loginIllustration}
          alt="Login Illustration"
          className="max-w-lg w-full"
        />
      </div>

    </div>
  );
}
