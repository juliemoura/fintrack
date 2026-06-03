import { Routes, Route } from "react-router";

import Login from "@/pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import Entries from "@/pages/Entries";
import { store } from "@/store/store";
import Layout from "@/pages/Layout";
import { Provider } from "react-redux";
import Relatory from "@/pages/Relatory";

function AppRoutes() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="entries" element={<Entries />} />
          <Route path="relatory" element={<Relatory />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default AppRoutes;
