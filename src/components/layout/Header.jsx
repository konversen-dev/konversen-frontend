import React from "react";

export default function Header({ title, subtitle }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-darkest mb-1">
        {title}
      </h1>
      {subtitle && (
        <p className="text-primary-dark text-base">{subtitle}</p>
      )}
    </div>
  );
}
