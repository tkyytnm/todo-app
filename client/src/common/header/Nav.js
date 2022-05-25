import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { fetchUserData, logoutUser } from "../../features/auth/authThunk";
import { useEffect } from "react";
import { FiSettings } from "react-icons/fi";

const Nav = ({ hamburger }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleClick = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className={hamburger && "open"}>
      {user.id ? (
        <>
          <Link to="todo">タスクリスト</Link>
          <Link to="user">
            <FiSettings />
            {user.email}
          </Link>
          <button onClick={handleClick} className="logout">
            ログアウト
          </button>
        </>
      ) : (
        <>
          <Link to="/login">ログイン</Link>
          <Link to="/register">ユーザー登録</Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
