import { useDispatch, useSelector } from "react-redux";
import { fetchToDos, selectToDos, updateToDo } from "./toDoSlice";
import { useEffect, useState } from "react";

const ToDo = () => {
  const dispatch = useDispatch();
  const toDos = useSelector(selectToDos);
  const [toDo, setToDo] = useState({});

  useEffect(() => {
    dispatch(fetchToDos());
  }, [dispatch]);

  const handleInputChange = (e, id) => {
    console.log(e);
    setToDo({
      id,
      body: e.target.value,
      completed: e.target.value,
    });
    dispatch(updateToDo(toDo));
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
                  checked={toDo.completed}
                  onChange={(e) => handleInputChange(e, toDo.id)}
                />
                <input
                  type="text"
                  value={toDo.body}
                  id="body"
                  name="body"
                  onChange={(e) => handleInputChange(e, toDo.id)}
                />
              </form>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ToDo;
