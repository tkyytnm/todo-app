import { useDispatch, useSelector } from "react-redux";
import { registerUser, selectIsLoading, selectUser } from "./authSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
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

  useEffect(() => {
    if (user.id) {
      navigate("/todo", { replace: true });
    }
  }, [navigate, user.id]);

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
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
                <label htmlFor="password">Password:</label>
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
                  Register
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
