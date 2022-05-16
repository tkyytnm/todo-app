import { useDispatch, useSelector } from "react-redux";
import { fetchToDos, selectToDos } from "./toDoSlice";
import { useEffect } from "react";

const ToDo = () => {
  const dispatch = useDispatch();
  const toDos = useSelector(selectToDos);

  useEffect(() => {
    dispatch(fetchToDos());
  }, [dispatch]);

  return (
    <>
      <h2>ToDo</h2>
      <ul>
        {toDos.map((toDo) => {
          return <li>{toDo.body}</li>;
        })}
      </ul>
    </>
  );
};

export default ToDo;
