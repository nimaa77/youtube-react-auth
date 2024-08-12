import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/Login";
import DashboardPage from "../pages/Dashboard";
import DashboardLayout from "../templates/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <p>home page</p>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
    ],
  },
]);

export default router;
