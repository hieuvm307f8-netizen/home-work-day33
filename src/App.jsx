import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { confirm } from "./Common/confirm";
import TodoList from "./Components/TodoList";
import TodoInput from "./Components/TodoInput";

const App = () => {
  const deletedMessage = () => toast.success("Xóa thành công!");
  const addedMessage = () => toast.success("Thêm thành công!");
  const errorMessage = () =>
    toast.error("Có lỗi khi xóa, vui lòng thử lại sau.");
  const [todosData, setTodoData] = useState([
    { id: 1, title: "Task 1", isDone: true },
    { id: 2, title: "Task 2", isDone: false },
    { id: 3, title: "Task 3", isDone: true },
  ]);
  const [inputTodo, setInputTodo] = useState("");
  const [currentTodo, setCurrentTodo] = useState({});

  const doneTodos = todosData.filter((item) => item.isDone);
  const isNotDoneTodos = todosData.filter((item) => !item.isDone);

  // ADD
  const handleChangeInput = (e) => {
    setInputTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputTodo.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      title: inputTodo,
      isDone: false,
    };
    addedMessage();
    setTodoData([newTodo, ...todosData]);
    setInputTodo("");
  };

  // Delete
  const handleDeleteTodo = async (id) => {
    try {
      const result = await confirm({
        message: "Do you want to delete this task ?",
      });
      if (result) {
        setTodoData(todosData.filter((item) => item.id !== id));
        deletedMessage();
      }
    } catch {
      errorMessage();
    }
  };

  // ToggleDone
  const handleToggleDone = (id) => {
    const updateDoneTodo = todosData.map((item) => {
      if (item.id === id) {
        return { ...item, isDone: !item.isDone };
      }
      return item;
    });
    setTodoData(updateDoneTodo);
  };

  // Update Todo
  const handleUpdateTitleTodo = (todo) => {
    setCurrentTodo({ ...todo });
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({
      ...currentTodo,
      title: e.target.value,
    });
  };

  const saveUpdate = () => {
    if (currentTodo.title.trim() === "") return;

    const updatedData = todosData.map((item) =>
      item.id === currentTodo.id ? currentTodo : item
    );

    setTodoData(updatedData);
    setCurrentTodo({}); 
    toast.info("Cập nhật thành công!");
  };

  return (
    <>
      <ToastContainer />
      <h1 className="title-app">Todo App</h1>
      <TodoInput
        handleChangeInput={handleChangeInput}
        handleAddTodo={handleAddTodo}
        inputTodo={inputTodo}
      />
      <div className="tasks-container">
        <h2 classNameame="state-todo__title" style={{color: '#fff', marginBottom: '10px'}}>Unfinished</h2>
        <TodoList
          handleUpdateTitleTodo={handleUpdateTitleTodo}
          handleToggleDone={handleToggleDone}
          todosData={isNotDoneTodos}
          handleDeleteTodo={handleDeleteTodo}
          currentTodo={currentTodo}
          handleEditInputChange={handleEditInputChange}
          saveUpdate={saveUpdate}
          setCurrentTodo={setCurrentTodo}
        />
        <div className="spacing"></div>
        <h2 className="state-todo__title">Finished</h2>
        <TodoList
          handleUpdateTitleTodo={handleUpdateTitleTodo}
          handleToggleDone={handleToggleDone}
          todosData={doneTodos}
          handleDeleteTodo={handleDeleteTodo}
          currentTodo={currentTodo}
          handleEditInputChange={handleEditInputChange}
          saveUpdate={saveUpdate}
          setCurrentTodo={setCurrentTodo}
        />
      </div>
    </>
  );
};

export default App;
