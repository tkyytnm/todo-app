import {
  selectUser,
  updateProfile,
  updatePassword,
  deleteUser,
  fetchUserData,
  selectIsLoading,
} from "../auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.email) {
      dispatch(updateProfile({ email: e.target.email.value }))
        .unwrap()
        .then((res) => {
          res.message ? setMessageEmail(res.message) : setMessageEmail("");
        });
    } else if (e.target.password) {
      dispatch(updatePassword({ password: e.target.password.value }))
        .unwrap()
        .then((res) => {
          res.message
            ? setMessagePassword(res.message)
            : setMessagePassword("");
        });
    }
  };

  const handleClick = () => {
    const confirm = window.confirm("本当にアカウントを削除しますか？");
    if (confirm) {
      dispatch(deleteUser());
    }
  };

  return (
    <>
      <h2>User profile</h2>
      <div className="profile">
        <h3>Update email</h3>
        <form onSubmit={handleSubmit}>
          {messageEmail && <p className="message-red">{messageEmail}</p>}
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={user.email}
            required
            maxLength="100"
          />
          <button disabled={isLoading} className="update">
            Update
          </button>
        </form>
        <h3>Update password</h3>
        <form onSubmit={handleSubmit}>
          {messagePassword && <p className="message-red">{messagePassword}</p>}
          <input
            type="password"
            id="password"
            name="password"
            defaultValue=""
            required
            maxLength="100"
          />
          <button disabled={isLoading} className="update">
            Update
          </button>
        </form>
        <h3>Delete user account</h3>
        <button onClick={handleClick} disabled={isLoading} className="delete">
          Delete
        </button>
      </div>
    </>
  );
};

export default User;
