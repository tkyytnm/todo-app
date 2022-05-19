import { useDispatch, useSelector } from "react-redux";
import { addToDo, selectIsLoading } from "./toDoSlice";
import { GrAdd } from "react-icons/gr";

const AddToDo = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const data = {
      body: e.target.body.value,
    };
    dispatch(addToDo(data));
    e.target.body.value = "";
  };

  return (
    <li>
      <form onSubmit={handleAddSubmit}>
        <label htmlFor="add-body">
          <GrAdd />
        </label>
        <input type="text" id="add-body" name="body" />
        <button disabled={isLoading}>Add</button>
      </form>
    </li>
  );
};

export default AddToDo;
