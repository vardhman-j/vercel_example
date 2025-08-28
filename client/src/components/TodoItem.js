import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
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
