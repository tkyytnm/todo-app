import { useLocation, Navigate } from "react-router-dom";
import { selectAuthUser } from "../auth/authSlice";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const authUser = useSelector(selectAuthUser);

  if (!authUser.id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
