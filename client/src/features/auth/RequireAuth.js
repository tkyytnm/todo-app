import { useLocation, Navigate } from "react-router-dom";
import { selectAuthUser } from "../auth/authSlice";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  let location = useLocation();
  let authUser = useSelector(selectAuthUser);

  if (!authUser.id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
