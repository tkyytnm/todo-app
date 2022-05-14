import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";

const Nav = () => {
  const dispatch = useDispatch();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
    </nav>
  );
};

export default Nav;
