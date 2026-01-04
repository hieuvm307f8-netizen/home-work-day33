const TodoList = ({
  todosData,
  handleDeleteTodo,
  handleToggleDone,
  handleUpdateTitleTodo,
  currentTodo,         
  handleEditInputChange, 
  saveUpdate,          
  setCurrentTodo        
}) => {
  return (
    <ul className="todo-list">
      {todosData.map((item) => (
        <li key={item.id}>
          {currentTodo && currentTodo.id === item.id ? (
            <div className="todo-edit-container" style={{ display: 'flex', width: '100%' }}>
              <input
                type="text"
                className="todo-text" 
                value={currentTodo.title}
                onChange={handleEditInputChange}
                autoFocus
              />
              <div className="options">
                <button onClick={saveUpdate} className="btn-save">
                  <i className="fa-solid fa-floppy-disk" />
                </button>
                <button onClick={() => setCurrentTodo({})} className="btn-cancel">
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <span className={item.isDone ? "todo-text completed" : "todo-text"}>
                {item.title}
              </span>
              <div className="options">
                <button
                  className="btn delete"
                  onClick={() => handleDeleteTodo(item.id)}
                >
                  <i className="fa-solid fa-eraser" />
                </button>
                <button onClick={() => handleUpdateTitleTodo(item)}>
                  <i className="fa-solid fa-pencil" />
                </button>
                <button onClick={() => handleToggleDone(item.id)}>
                  <i className="fa-solid fa-check" />
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;