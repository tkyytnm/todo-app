import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectIsLoading, selectUser } from "./authSlice";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      navigate("/todo", { replace: true });
    }
  }, [user.id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email: e.target.email.value,
        password: e.target.password.value,
      })
    )
      .then(() => navigate("/todo", { replace: true }))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="email">Email:</label>
              </td>
              <td>
                <input type="email" id="email" name="email" required />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">Password:</label>
              </td>
              <td>
                <input type="password" id="password" name="password" required />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button disabled={isLoading} className="positive">
                  Login
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
};

export default Login;
