"use client";

import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { TaskInput } from "../components/TaskInput";
import { CategoryInput } from "../components/CategoryInput";
import { CategoryList } from "../components/CategoryList";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";

interface Task {
  taskId: number;
  text: string;
  done: boolean;
  categoryId: number | null;
}

interface Category {
  categoryId: number;
  name: string;
}

interface TodoResponse {
  taskId: number;
  text: string;
  done: boolean;
  categoryId: number | null;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data: TodoResponse[]) =>
        setTasks(
          data.map((t) => ({
            taskId: t.taskId,
            text: t.text,
            done: t.done,
            categoryId: t.categoryId,
          }))
        )
      );
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: Category[]) => setCategories(data));
  }, []);

  // TASK
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
        done: newTask.done,
        categoryId: newTask.categoryId,
      },
      ...prev,
    ]);
  };

  const toggleTask = async (id: number) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toggleDone: true }),
      });
      const updated = await res.json();
      setTasks((prev) => prev.map((task) => (task.taskId === id ? { ...task, done: updated.done } : task)));
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche:", error);
    }
  };

  const deleteTask = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((task) => task.taskId !== id));
  };

  // CATEGORY
  const addCategory = async (name: string) => {
    const res = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });
    const newCategory = await res.json();
    setCategories((prev) => [...prev, newCategory]);
  };

  const deleteCategory = async (id: number) => {
    try {
      await fetch(`/api/categories/${id}`, { method: "DELETE" });
      setCategories((prev) => prev.filter((c) => c.categoryId !== id));
      setTasks((prev) => prev.map((t) => (t.categoryId === id ? { ...t, categoryId: null } : t)));
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie:", error);
    }
  };

  // DRAG AND DROP
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = Number(active.id);
    const newCategoryId = over.id === "uncategorized" ? null : Number(over.id);

    try {
      const res = await fetch(`/api/todos/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId: newCategoryId }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task category");
      }

      const updatedTask = await res.json();

      setTasks((prev) => prev.map((task) => (task.taskId === taskId ? { ...task, categoryId: updatedTask.categoryId } : task)));
    } catch (error) {
      console.error("Erreur lors du déplacement de la tâche:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Header />
        <main className="mt-8">
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <TaskInput onAddTask={addTask} />
            <CategoryInput onAddCategory={addCategory} />
          </div>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <CategoryList
              categories={categories}
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onDeleteCategory={deleteCategory}
              onMoveTask={(taskId, newCategoryId) => {
                setTasks((prev) => prev.map((task) => (task.taskId === taskId ? { ...task, categoryId: newCategoryId } : task)));
              }}
            />
          </DndContext>
        </main>
      </div>
    </div>
  );
}
