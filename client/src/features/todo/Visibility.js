import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../auth/authSlice";
import { updateVisibility } from "../auth/authThunk";

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
      <label htmlFor="visibility">完了したタスクを表示する</label>
    </p>
  );
};

export default Visibility;
