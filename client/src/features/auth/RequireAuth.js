import { useLocation, useNavigate } from "react-router-dom";
import { fetchUserData, selectUser } from "./authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RequireAuth = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserData())
      .unwrap()
      .then((res) => {
        if (!res.id) {
          navigate("/login", { state: { from: location }, replace: true });
        }
      });
  }, [dispatch, location, user.id, navigate]);
};

export default RequireAuth;
