import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUser,
  fetchAuthUserData,
  selectAuthUser,
} from "../../features/auth/authSlice";
import { selectUser } from "../../features/user/userSlice";
import { useEffect } from "react";

const Nav = () => {
  const authUser = useSelector(selectAuthUser);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthUserData());
  }, [dispatch, user]);

  const handleClick = () => {
    dispatch(logoutUser());
  };

  return (
    <nav>
      {authUser.id ? (
        <>
          <Link to="todo">ToDo</Link>
          <Link to="user">{authUser.email}</Link>
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
