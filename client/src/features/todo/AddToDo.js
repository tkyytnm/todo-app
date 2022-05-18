import { useDispatch } from "react-redux";
import { addToDo } from "./toDoSlice";

const AddToDo = () => {
  const dispatch = useDispatch();

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
        <input type="text" id="body" name="body" />
        <button>Add</button>
      </form>
    </li>
  );
};

export default AddToDo;
