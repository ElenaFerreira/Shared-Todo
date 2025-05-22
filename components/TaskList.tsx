import React from "react";
import { TaskItem } from "./TaskItem";

interface Task {
  taskId: number;
  text: string;
  done: boolean;
  categoryId: number;
}
interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}
export const TaskList = ({ tasks, onToggleTask, onDeleteTask }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No tasks yet. Add one above!</p>
      </div>
    );
  }
  return (
    <ul className="divide-y divide-gray-100">
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} onToggle={onToggleTask} onDelete={onDeleteTask} />
      ))}
    </ul>
  );
};
