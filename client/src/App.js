import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/todos');
        setTodos(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch todos');
        console.error('Error fetching todos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async (text) => {
    try {
      const response = await axios.post('/api/todos', { text });
      setTodos([...todos, response.data]);
    } catch (err) {
      setError('Failed to add todo');
      console.error('Error adding todo:', err);
    }
  };

  // Toggle todo completion status
  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(todo => todo.id === id);
      const response = await axios.put(`/api/todos/${id}`, {
        completed: !todo.completed
      });
      
      setTodos(todos.map(todo => 
        todo.id === id ? response.data : todo
      ));
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  // Clear completed todos
  const clearCompleted = async () => {
    try {
      await axios.delete('/api/todos/completed');
      setTodos(todos.filter(todo => !todo.completed));
    } catch (err) {
      setError('Failed to clear completed todos');
      console.error('Error clearing completed todos:', err);
    }
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' filter
  });

  // Count of active todos
  const activeTodoCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="container">
      <div className="app">
        <h1>Todo App</h1>
        
        <TodoForm addTodo={addTodo} />
        
        <TodoFilter 
          filter={filter} 
          setFilter={setFilter} 
        />
        
        {loading ? (
          <p>Loading todos...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <TodoList 
            todos={filteredTodos} 
            toggleTodo={toggleTodo} 
            deleteTodo={deleteTodo}
            filter={filter}
          />
        )}
        
        {todos.length > 0 && (
          <div className="todo-footer">
            <span>{activeTodoCount} {activeTodoCount === 1 ? 'task' : 'tasks'} left</span>
            {todos.some(todo => todo.completed) && (
              <button 
                className="clear-completed" 
                onClick={clearCompleted}
              >
                Clear completed
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
