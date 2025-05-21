"use client";

import { useEffect, useState } from "react";

interface Todo {
  _id: string;
  text: string;
  done: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des tâches</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className="mb-2 flex items-center">
            <span className={todo.done ? "line-through text-green-500" : ""}>{todo.text}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
