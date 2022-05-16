import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import { fetchUserData, selectUser } from "../../features/user/userSlice";
import { useEffect } from "react";

const Nav = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
      {user.id && <div>{user.email}</div>}
    </nav>
  );
};

export default Nav;
