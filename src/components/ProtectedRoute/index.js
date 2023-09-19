import { Navigate } from "react-router-dom";

/* ProtectedRoute component for redirection only when we have a user registered */
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("authentication")
  const isUserAuthenticated = isAuthenticated === "true"
  // console.log(isUserAuthenticated);
  return isUserAuthenticated ? element : <Navigate to="/" replace  />;
};

export default ProtectedRoute;


