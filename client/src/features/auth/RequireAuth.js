import { useLocation, Navigate } from "react-router-dom";
import { selectUser } from "../user/userSlice";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  let location = useLocation();
  let user = useSelector(selectUser);

  if (!user.id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
