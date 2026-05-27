import { Routes, Route } from "react-router";

import Login from "../pages/Login";

import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;