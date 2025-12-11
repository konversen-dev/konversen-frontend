import React from "react";

export default function SummaryCard({ title, value, iconSrc, altText }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 flex justify-between items-center hover:shadow-lg transition">
      <div>
        <h2 className="text-semibold text-primary-darkest">{title}</h2>
        <p className="text-2xl font-bold text-primary-light mt-1">{value}</p>
      </div>
      <div className="bg-primary-light p-3 rounded-lg flex items-center justify-center">
        <img
          src={iconSrc}
          alt={altText || title}
          className="w-5 h-5 object-contain filter brightness-0 invert" 
        />
      </div>
    </div>
  );
}
