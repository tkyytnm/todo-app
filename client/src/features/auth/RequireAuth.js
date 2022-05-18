import { useLocation, Navigate } from "react-router-dom";
import { selectAuthUser, fetchAuthUserData } from "../auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const authUser = useSelector(selectAuthUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthUserData()).then(() => {
      if (!authUser.id) {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
    });
  }, [dispatch, authUser.id, location]);

  return children;
};

export default RequireAuth;
