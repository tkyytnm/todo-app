import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectAuthUser } from "../../features/auth/authSlice";
import { fetchUserData, selectUser } from "../../features/user/userSlice";
import { useEffect } from "react";

const Nav = () => {
  const user = useSelector(selectUser);
  const authUser = useSelector(selectAuthUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch, authUser]);

  const handleClick = () => {
    dispatch(logoutUser());
  };

  return (
    <nav>
      <Link to="/">Home</Link>

      {user.id ? (
        <>
          <Link to="todo">ToDo</Link>
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
