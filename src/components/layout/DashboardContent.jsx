import React from "react";
import Footer from "./Footer.jsx";

export default function DashboardContent({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
