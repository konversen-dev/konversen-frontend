import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

// Pages
import Login from "./pages/Login.jsx";

// Sales
import Dashboard from "./pages/Sales/Dashboard.jsx";
import Campaign from "./pages/Sales/Campaign.jsx";
import Profile from "./pages/Sales/Profile.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman default */}
        <Route path="/" element={<Login />} />

        {/* Sales */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaign-sales" element={<Campaign />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
