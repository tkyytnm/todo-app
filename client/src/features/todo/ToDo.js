import ToDoList from "./ToDoList";
import AddToDo from "./AddToDo";

const ToDo = () => {
  return (
    <>
      <h2>ToDo List</h2>
      <ul id="todo">
        <ToDoList />
        <AddToDo />
      </ul>
    </>
  );
};

export default ToDo;
