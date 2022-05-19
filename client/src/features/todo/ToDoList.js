import { useDispatch, useSelector } from "react-redux";
import {
  fetchToDos,
  selectToDos,
  updateToDo,
  deleteToDo,
  selectIsLoading,
} from "./toDoSlice";
import { selectUser } from "../auth/authSlice";
import { useEffect } from "react";

const ToDoList = () => {
  const dispatch = useDispatch();
  const toDos = useSelector(selectToDos);
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchToDos());
  }, [dispatch]);

  const handleUpdateBlur = (e, toDoObj) => {
    if (toDoObj.body !== e.target.value) {
      const data = {
        id: toDoObj.id,
        body: e.target.value,
        completed: toDoObj.completed,
      };
      dispatch(updateToDo(data));
    }
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

  const filterToDos = (toDos) => {
    if (user.visibility) {
      return toDos;
    } else {
      return toDos.filter((toDo) => !toDo.completed);
    }
  };

  return (
    <>
      {filterToDos(toDos).map((toDo) => {
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
              className={toDo.completed ? "completed" : ""}
              onBlur={(e) => handleUpdateBlur(e, toDo)}
            />
            <button
              onClick={() => handleDeleteClick(toDo.id)}
              disabled={isLoading}
              className="delete"
            >
              Delete
            </button>
          </li>
        );
      })}
    </>
  );
};

export default ToDoList;
