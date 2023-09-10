import { ITodo } from "../@types/todo";

type TodoItemProps = {
  todo: ITodo;
  toggleTodo: (id: string, completed: boolean) => void;
  removeTodo: (id: string) => void;
};

export default function TodoItem({
  todo,
  toggleTodo,
  removeTodo,
}: TodoItemProps) {
  return (
    <ul>
      <li>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => toggleTodo(todo.id, e.target.checked)}
        />

        {todo.title}

        <span onClick={() => removeTodo(todo.id)} className="cross">
          &times;
        </span>
      </li>
    </ul>
  );
}
