import { useAuth } from "../contexts/authContext/index";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userLoggedIn } = useAuth();
  
  return userLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;