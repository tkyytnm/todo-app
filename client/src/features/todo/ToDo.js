import { useDispatch, useSelector } from "react-redux";
import {
  fetchToDos,
  selectToDos,
  updateToDo,
  addToDo,
  deleteToDo,
} from "./toDoSlice";
import { useEffect } from "react";

const ToDo = () => {
  const dispatch = useDispatch();
  const toDos = useSelector(selectToDos);

  useEffect(() => {
    dispatch(fetchToDos());
  }, [dispatch]);

  const handleUpdateBlur = (e, toDoObj) => {
    const data = {
      id: toDoObj.id,
      body: e.target.value,
      completed: toDoObj.completed,
    };
    dispatch(updateToDo(data));
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteToDo(id));
  };

  const handleUpdateChange = (e, toDoObj) => {
    const data = {
      id: toDoObj.id,
      body: toDoObj.body,
      completed: e.target.checked,
    };
    dispatch(updateToDo(data));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const data = {
      body: e.target.body.value,
    };
    dispatch(addToDo(data));
    e.target.body.value = "";
  };

  return (
    <>
      <h2>ToDo List</h2>
      <ul>
        {toDos.map((toDo) => {
          return (
            <li key={toDo.id}>
              <input
                type="checkbox"
                id="completed"
                name="completed"
                defaultChecked={toDo.completed}
                onChange={(e) => handleUpdateChange(e, toDo)}
              />
              <input
                type="text"
                defaultValue={toDo.body}
                id="body"
                name="body"
                onBlur={(e) => handleUpdateBlur(e, toDo)}
              />
              <button onClick={() => handleDeleteClick(toDo.id)}>Delete</button>
            </li>
          );
        })}
        <li>
          <form onSubmit={handleAddSubmit}>
            <input type="text" id="body" name="body" />
            <button>Add</button>
          </form>
        </li>
      </ul>
    </>
  );
};

export default ToDo;
