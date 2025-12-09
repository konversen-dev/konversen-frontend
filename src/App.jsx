import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

/* LOGIN */
import Login from "./pages/Login.jsx";

/* SALES */
import SalesDashboard from "./pages/Sales/Dashboard.jsx";
import SalesCampaign from "./pages/Sales/Campaign.jsx";
import SalesProfile from "./pages/Sales/Profile.jsx";

/* MANAGER */
import ManagerDashboard from "./pages/Manager/ManagerDashboard.jsx";
import ManagerCampaign from "./pages/Manager/ManagerCampaign.jsx";
import ManagerProfile from "./pages/Manager/Profile.jsx";

/* ADMIN */
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminProfile from "./pages/Admin/Profile.jsx";

function App() {
  return (
    <Router>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* SALES ROUTES */}
        <Route path="/sales/dashboard" element={<SalesDashboard />} />
        <Route path="/sales/campaign" element={<SalesCampaign />} />
        <Route path="/sales/profile" element={<SalesProfile />} />

        {/* MANAGER ROUTES */}
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/manager/campaign" element={<ManagerCampaign />} />
        <Route path="/manager/profile" element={<ManagerProfile />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/profile" element={<AdminProfile />} />

      </Routes>
    </Router>
  );
}

export default App;
