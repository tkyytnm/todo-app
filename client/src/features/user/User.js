import {
  selectUser,
  updateProfile,
  updatePassword,
  deleteUser,
} from "./userSlice";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.email) {
      dispatch(updateProfile({ email: e.target.email.value }));
    } else if (e.target.password) {
      dispatch(updatePassword({ password: e.target.password.value }));
    }
  };

  const handleClick = () => {
    const confirm = window.confirm("Are you sure you want to delete account?");
    if (confirm) {
      dispatch(deleteUser());
    }
  };

  return (
    <>
      <h2>User preference</h2>
      <h3>Change email</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={user.email}
          required
        />
        <button>Update</button>
      </form>
      <h3>Change password</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          id="password"
          name="password"
          defaultValue=""
          required
        />
        <button>Update</button>
      </form>
      <h3>Delete user account</h3>
      <button onClick={handleClick}>Delete</button>
    </>
  );
};

export default User;
