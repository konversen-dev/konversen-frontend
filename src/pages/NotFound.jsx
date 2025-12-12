import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function NotFound() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const handleGoBack = () => {
    if (isAuthenticated && user) {
      // Redirect ke dashboard sesuai role
      if (user.role === 'Admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'Manager') {
        navigate('/manager/dashboard');
      } else if (user.role === 'Sales') {
        navigate('/sales/dashboard');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary-light to-secondary-light px-4">
      <div className="text-center">
        {/* 404 Number */}
        <h1 className="text-9xl font-bold text-white mb-4 font-montserrat">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-montserrat">
          Page Not Found
        </h2>
        
        <p className="text-lg text-white/90 mb-8 max-w-md mx-auto font-lato">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Action Button */}
        <button
          onClick={handleGoBack}
          className="bg-white text-primary-light font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg font-lato"
        >
          {isAuthenticated ? 'Go to Dashboard' : 'Go to Home'}
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
    </div>
  );
}
