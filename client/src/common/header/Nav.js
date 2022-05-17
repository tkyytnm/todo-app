import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUser,
  fetchUserData,
  selectUser,
} from "../../features/user/userSlice";
import { useEffect } from "react";

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
      <Link to="/">Home</Link>
      <Link to="todo">ToDo</Link>
      {user.id ? (
        <>
          <div>{user.email}</div>
          <button onClick={handleClick}>Logout</button>
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
