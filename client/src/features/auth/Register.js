import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading } from "./authSlice";
import { registerUser } from "./authThunk";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        email: e.target.email.value,
        password: e.target.password.value,
      })
    )
      .unwrap()
      .then((res) => {
        if (res.id) {
          navigate("/todo", { replace: true });
        } else {
          setMessage(res.message);
        }
      });
  };

  return (
    <>
      <h2>ユーザー登録</h2>
      <form onSubmit={handleSubmit} id="register">
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="email">Email:</label>
              </td>
              <td>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength="100"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">パスワード:</label>
              </td>
              <td>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  maxLength="100"
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                {message && <p className="message-red">{message}</p>}
                <button disabled={isLoading} className="positive">
                  登録
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
};

export default Register;
