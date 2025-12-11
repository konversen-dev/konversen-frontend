import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

/* CONTEXT */
import { AuthProvider } from "./contexts/AuthContext.jsx";

/* COMPONENTS */
import ProtectedRoute from "./components/utils/ProtectedRoute.jsx";

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
      <AuthProvider>
        <Routes>

          {/* LOGIN */}
          <Route path="/" element={<Login />} />

          {/* SALES ROUTES */}
          <Route 
            path="/sales/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['Sales']}>
                <SalesDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sales/campaign" 
            element={
              <ProtectedRoute allowedRoles={['Sales']}>
                <SalesCampaign />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sales/profile" 
            element={
              <ProtectedRoute allowedRoles={['Sales']}>
                <SalesProfile />
              </ProtectedRoute>
            } 
          />

          {/* MANAGER ROUTES */}
          <Route 
            path="/manager/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['Manager']}>
                <ManagerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/manager/campaign" 
            element={
              <ProtectedRoute allowedRoles={['Manager']}>
                <ManagerCampaign />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/manager/profile" 
            element={
              <ProtectedRoute allowedRoles={['Manager']}>
                <ManagerProfile />
              </ProtectedRoute>
            } 
          />

          {/* ADMIN ROUTES */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/profile" 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminProfile />
              </ProtectedRoute>
            } 
          />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
