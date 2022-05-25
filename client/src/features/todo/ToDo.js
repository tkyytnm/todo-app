import ToDoList from "./ToDoList";
import AddToDo from "./AddToDo";
import Visibility from "./Visibility";

const ToDo = () => {
  return (
    <>
      <h2>タスクリスト</h2>
      <Visibility />
      <ul id="todo">
        <ToDoList />
        <AddToDo />
      </ul>
    </>
  );
};

export default ToDo;
