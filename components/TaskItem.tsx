import React from "react";
import { CheckIcon, TrashIcon } from "lucide-react";

interface Task {
  taskId: number;
  text: string;
  done: boolean;
}
interface TaskItemProps {
  task: Task;
  onToggle: (taskId: number) => void;
  onDelete: (taskId: number) => void;
}
export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <li className="flex items-center p-4 group hover:bg-gray-50 transition-colors duration-150">
      <button
        onClick={() => onToggle(task.taskId)}
        className={`flex-shrink-0 w-6 h-6 mr-3 rounded-full border ${
          task.done ? "bg-green-500 border-green-500 text-white" : "border-gray-300 text-transparent hover:border-green-500"
        } flex items-center justify-center cursor-pointer transition-colors duration-200`}
        aria-label={task.done ? "Mark as incomplete" : "Mark as complete"}
      >
        {task.done && <CheckIcon className="h-4 w-4" />}
      </button>
      <span className={`flex-grow ${task.done ? "text-gray-400 line-through" : "text-gray-800"}`}>{task.text}</span>
      <button
        onClick={() => onDelete(task.taskId)}
        className="text-gray-400 hover:text-red-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
        aria-label="Delete task"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </li>
  );
};
