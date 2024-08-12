import { Navigate } from "react-router-dom";
import { getIsLoggedIn } from "@/utils/flags";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = getIsLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}
