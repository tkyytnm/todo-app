import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectIsLoading, selectAuthUser } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const authUser = useSelector(selectAuthUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser.id) {
      navigate("/todo", { replace: true });
    }
  }, [authUser.id, navigate]);

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
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button disabled={isLoading} className="positive">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
