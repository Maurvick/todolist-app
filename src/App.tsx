import { useEffect, useRef, useState } from "react";
import { ITodo } from "./@types/todo";
import "./App.css";
import TodoList from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const todoNameRef = useRef<HTMLInputElement | null>(null);

  // load todos from local storage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    setTodos(storedTodos ? JSON.parse(storedTodos) : []);
  }, []);

  // update todos in local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const todoName = todoNameRef.current?.value;

    if (todoName === "" || todoName === undefined) return;

    setTodos((previousTodos) => {
      return [
        ...previousTodos,
        { id: uuidv4(), title: todoName, completed: false },
      ];
    });

    // clear all input values in the form
    event.target.reset();
  };

  const toggleTodo = (id: string, completed: boolean) => {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  };

  const removeTodo = (id: string) => {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  };

  return (
    <>
      <main className="todo">
        <h2>To-Do List 📝</h2>
        <p>{todos.filter((todo) => !todo.completed).length} left to do</p>

        <form onSubmit={(e: FormEvent) => addTodo(e)} className="row">
          <input ref={todoNameRef} placeholder="New todo" />
          <button type="submit">Add</button>
        </form>
      </main>

      <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
    </>
  );
}

export default App;
