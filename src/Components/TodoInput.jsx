const TodoInput = ({handleChangeInput, handleAddTodo, inputTodo}) => {
  return (
    <>
      <div className="todo-input">
        <input
          type="text"
          name="todo"
          placeholder="Add todo...."
          onChange={handleChangeInput}
          value={inputTodo}
        />
        <button onClick={handleAddTodo}>
          <i className="fa-solid fa-calendar-plus" />
        </button>
      </div>
    </>
  );
};

export default TodoInput;
