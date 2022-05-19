import { useDispatch, useSelector } from "react-redux";
import { registerUser, selectIsLoading, selectUser } from "./authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      navigate("/todo", { replace: true });
    }
  }, [user.id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        email: e.target.email.value,
        password: e.target.password.value,
      })
    );
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <table>
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
                Register
              </button>
            </td>
          </tr>
        </table>
      </form>
    </>
  );
};

export default Register;
