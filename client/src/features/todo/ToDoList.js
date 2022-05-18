import { useDispatch, useSelector } from "react-redux";
import { fetchToDos, selectToDos, updateToDo, deleteToDo } from "./toDoSlice";
import { useEffect } from "react";

const ToDoList = () => {
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

  return (
    <>
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
    </>
  );
};

export default ToDoList;
