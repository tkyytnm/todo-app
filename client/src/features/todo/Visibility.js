import { useDispatch, useSelector } from "react-redux";
import { updateVisibility } from "../user/userSlice";
import { selectAuthUser } from "../auth/authSlice";

const Visibility = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(selectAuthUser);

  const handleOnChange = (e) => {
    const data = {
      visibility: e.target.checked,
    };
    dispatch(updateVisibility(data));
  };

  return (
    <p>
      <input
        type="checkbox"
        name="visibility"
        id="visibility"
        defaultChecked={authUser.visibility}
        onChange={handleOnChange}
      />
      <label htmlFor="visibility">Show completed tasks.</label>
    </p>
  );
};

export default Visibility;
