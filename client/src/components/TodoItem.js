import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo, filter }) {
  // Only apply the 'completed' class if the todo is completed AND we're not in the completed filter
  const showStrikethrough = todo.completed && filter !== 'completed';
  
  return (
    <li className={`todo-item ${showStrikethrough ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span className="todo-text">{todo.text}</span>
      <button
        className="delete-btn"
        onClick={() => deleteTodo(todo.id)}
        aria-label="Delete task"
      >
        ×
      </button>
    </li>
  );
}

export default TodoItem;
