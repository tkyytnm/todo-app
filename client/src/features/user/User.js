import { selectUser, selectIsLoading } from "../auth/authSlice";
import { updateProfile, updatePassword, deleteUser } from "../auth/authThunk";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");

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
      <h2>ユーザー設定</h2>
      <div className="profile">
        <h3>Emailの変更</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={user.email}
            required
            maxLength="100"
          />
          <button disabled={isLoading} className="update">
            変更
          </button>
          {messageEmail && <p className="message-red">{messageEmail}</p>}
        </form>
        <h3>パスワードの変更</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue=""
            required
            maxLength="100"
          />
          <button disabled={isLoading} className="update">
            変更
          </button>
          {messagePassword && <p className="message-red">{messagePassword}</p>}
        </form>
        <h3>ユーザーアカウントの削除</h3>
        <button onClick={handleClick} disabled={isLoading} className="delete">
          削除
        </button>
      </div>
    </>
  );
};

export default User;
