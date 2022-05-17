import { useDispatch, useSelector } from "react-redux";
import { fetchToDos, selectToDos, updateToDo } from "./toDoSlice";
import { useEffect } from "react";

const ToDo = () => {
  const dispatch = useDispatch();
  const toDos = useSelector(selectToDos);

  useEffect(() => {
    dispatch(fetchToDos());
  }, [dispatch]);

  const handleSubmit = (e, toDoObj) => {
    e.preventDefault();
    const data = {
      id: toDoObj.id,
      body: e.target.body.value,
      completed: toDoObj.completed,
    };
    dispatch(updateToDo(data));
  };

  const handleChange = (e, toDoObj) => {
    const data = {
      id: toDoObj.id,
      body: toDoObj.body,
      completed: e.target.checked,
    };
    dispatch(updateToDo(data));
  };

  return (
    <>
      <h2>ToDo List</h2>
      <ul>
        {toDos.map((toDo) => {
          return (
            <li key={toDo.id}>
              <form>
                <input
                  type="checkbox"
                  id="completed"
                  name="completed"
                  defaultChecked={toDo.completed}
                  onChange={(e) => handleChange(e, toDo)}
                />
              </form>
              <form onSubmit={(e) => handleSubmit(e, toDo)}>
                <input
                  type="text"
                  defaultValue={toDo.body}
                  id="body"
                  name="body"
                />
                <button>Send</button>
              </form>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ToDo;
