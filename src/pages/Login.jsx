import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import loginIllustration from "../assets/sales/login-illustration.png";
import konversenLogo from "../assets/logo/konversenLogo.png";

export default function Login() {
  const { login, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect jika sudah login
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'Admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'Manager') {
        navigate('/manager/dashboard');
      } else if (user.role === 'Sales') {
        navigate('/sales/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (!result.success) {
        setError(result.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
            {/* ERROR MESSAGE */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-primary-darkest mb-1">
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                required
                disabled={loading}
                className="w-full border text-sm border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light disabled:bg-gray-100"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-primary-darkest mb-1">
                Password*
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your Password"
                required
                disabled={loading}
                className="w-full border text-sm border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light disabled:bg-gray-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary-light text-white font-semibold py-2 rounded-lg hover:bg-orange-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
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
