import React from "react";
import { useNavigate } from "react-router-dom";
import loginIllustration from "../assets/sales/login-illustration.png";

export default function Login() {
  const navigate = useNavigate();

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   // (nanti bisa tambahkan logika auth di sini)
  //   navigate("/dashboard");
  // };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (email.toLowerCase().includes("admin")) {
      navigate("/admin");
    } else if (email.toLowerCase().includes("manager")) {
      navigate("/manager");
    } else {
      navigate("/dashboard");
    }
  };



  return (
    <div className="flex h-screen font-lato">
      {/* Kiri - Form Login */}
      <div className="w-1/2 flex flex-col justify-center px-24 bg-white">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-primary-light font-montserrat">
            Welcome Back
          </h1>
          <p className="text-primary-dark mb-8">Please enter your details!</p>

          <form onSubmit={handleLogin} className="flex flex-col space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-primary-darkest mb-1">
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email" //ini tambahan
                placeholder="Your Email"
                className="w-full border text-sm border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-primary-darkest mb-1">
                Password*
              </label>
              <input
                type="password"
                id="password"
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
        </div>

        <footer className="text-sm text-center text-primary-dark mt-20">
          © 2025 Conversify all rights reserved
        </footer>
      </div>

      {/* Kanan - Gambar & Logo */}
      <div className="w-1/2 bg-secondary-light flex flex-col justify-between py-10 px-12">
        <div className="text-right">
          <h2 className="text-primary-light font-bold text-lg font-montserrat">
            Conversify
          </h2>
        </div>

        <div className="flex justify-center">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="max-w-md w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
