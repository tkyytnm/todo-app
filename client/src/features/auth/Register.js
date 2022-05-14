import { useDispatch } from "react-redux";
import { sendUserData } from "./authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      sendUserData({
        email: e.target.email.value,
        password: e.target.password.value,
      })
    );
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button>Register</button>
      </form>
    </>
  );
};

export default Register;
