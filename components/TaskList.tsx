import React from "react";
import { TaskItem } from "./TaskItem";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}
interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
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
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggleTask} onDelete={onDeleteTask} />
      ))}
    </ul>
  );
};
