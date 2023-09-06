import { ITodo } from "../@types/todo";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: ITodo[];
  toggleTodo: (id: string, completed: boolean) => void;
  removeTodo: (id: string) => void;
};

export default function TodoList({
  todos,
  toggleTodo,
  removeTodo,
}: TodoListProps) {
  return (
    <>
      {todos?.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
        />
      ))}
    </>
  );
}
