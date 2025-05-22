"use client";

import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { TaskInput } from "../components/TaskInput";
import { TaskList } from "../components/TaskList";

interface Task {
  taskId: number;
  text: string;
  completed: boolean;
}

interface TodoResponse {
  taskId: number;
  text: string;
  done: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data: TodoResponse[]) =>
        setTasks(
          data.map((t) => ({
            taskId: t.taskId,
            text: t.text,
            completed: t.done,
          }))
        )
      );
  }, []);

  const addTask = async (text: string) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTask = await res.json();
    setTasks((prev) => [
      {
        taskId: newTask.taskId,
        text: newTask.text,
        completed: newTask.done,
      },
      ...prev,
    ]);
  };

  const toggleTask = async (id: number) => {
    const res = await fetch(`/api/todos/${id}`, { method: "PATCH" });
    const updated = await res.json();
    setTasks((prev) => prev.map((task) => (task.taskId === id ? { ...task, completed: updated.done } : task)));
  };

  const deleteTask = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((task) => task.taskId !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Header />
        <main className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden">
          <TaskInput onAddTask={addTask} />
          <TaskList tasks={tasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
        </main>
      </div>
    </div>
  );
}
