import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import './styles.css'; 

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Learn React",
      description: "Learning React from 5 - 8",
      completed: false,
      completionTime: null
    },
    {
      id: 2,
      title: "Learn DSA",
      description: "Learning React from 9 - 12",
      completed: true,
      completionTime: "10:30 AM"
    }
  ]);

  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");

  const handleAddTodo = () => {
    if (newTodoTitle.trim() !== "") {
      const newTodo = {
        id: todos.length + 1,
        title: newTodoTitle,
        description: newTodoDescription,
        completed: false,
        completionTime: null
      };
      setTodos([...todos, newTodo]);
      setNewTodoTitle("");
      setNewTodoDescription("");
    }
  };

  const handleTodoCompletion = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: true,
          completionTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleClearTodos = () => {
    setTodos([]);
  };

  return (
    <div className="App">
      <h1>Todos App</h1>
      <div className="add-todo">
        <input
          type="text"
          placeholder="Todo Title"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Todo Description"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
        <button onClick={handleClearTodos}>Clear All</button>
      </div>
      <div className="todos">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onTodoCompletion={handleTodoCompletion}
          />
        ))}
      </div>
    </div>
  );
}

function Todo({ todo, onTodoCompletion }) {
  return (
    <div className={`todo ${todo.completed ? "completed" : ""}`}>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      {!todo.completed && (
        <button onClick={() => onTodoCompletion(todo.id)}>Done</button>
      )}
      {todo.completed && (
        <div>
          <span>Completed at: {todo.completionTime}</span>
          <span className="done"> Done &#10004; </span>
        </div>
      )}
    </div>
  );
}

export default App;
