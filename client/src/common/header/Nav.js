import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { fetchUserData, logoutUser } from "../../features/auth/authThunk";
import { useEffect } from "react";
import { FiSettings } from "react-icons/fi";

const Nav = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleClick = () => {
    dispatch(logoutUser());
  };

  return (
    <nav>
      {user.id ? (
        <>
          <Link to="todo">ToDo</Link>
          <Link to="user">
            <FiSettings />
            {user.email}
          </Link>
          <button onClick={handleClick} className="logout">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
