import { useDispatch, useSelector } from "react-redux";
import { updateVisibility, selectUser } from "../auth/authSlice";

const Visibility = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

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
        defaultChecked={user.visibility}
        onChange={handleOnChange}
      />
      <label htmlFor="visibility">Show completed tasks.</label>
    </p>
  );
};

export default Visibility;
