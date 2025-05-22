"use client";

import { useEffect, useState } from "react";

type Todo = {
  _id: string;
  text: string;
  done: boolean;
};

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: { "Content-Type": "application/json" },
    });
    const newTodo = await res.json();
    setTodos([newTodo, ...todos]);
    setText("");
  };

  const toggleTodo = async (id: string) => {
    const res = await fetch(`/api/todos/${id}`, { method: "PATCH" });
    const updated = await res.json();
    setTodos(todos.map((t) => (t._id === id ? updated : t)));
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">📝 Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border p-2 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Ajouter une tâche..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addTodo}>
          +
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className="flex items-center gap-2 mb-2">
            <button onClick={() => toggleTodo(todo._id)} className={`w-5 h-5 border rounded ${todo.done ? "bg-green-500" : ""}`} />
            <span className={todo.done ? "line-through text-gray-400" : ""}>{todo.text}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
