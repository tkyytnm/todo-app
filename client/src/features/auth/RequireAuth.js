import { useLocation, Navigate } from "react-router-dom";
import { selectUser } from "./authSlice";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const user = useSelector(selectUser);

  if (!user.id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
