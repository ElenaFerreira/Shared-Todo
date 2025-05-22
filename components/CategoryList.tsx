import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { TaskItem } from "./TaskItem";
import { XIcon } from "lucide-react";

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

interface CategoryListProps {
  categories: Category[];
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onDeleteCategory: (id: number) => void;
}
export const CategoryList = ({ categories, tasks, onToggleTask, onDeleteTask, onDeleteCategory }: CategoryListProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <div key={category.categoryId} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">{category.name}</h2>
            {category.categoryId !== 1 && (
              <button
                onClick={() => onDeleteCategory(category.categoryId)}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                aria-label="Delete category"
              >
                <XIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          <CategoryContainer
            id={category.categoryId.toString()}
            tasks={tasks.filter((task) => task.categoryId === category.categoryId)}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
          />
        </div>
      ))}
    </div>
  );
};
interface CategoryContainerProps {
  id: string;
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}
const CategoryContainer = ({ id, tasks, onToggleTask, onDeleteTask }: CategoryContainerProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <div ref={setNodeRef} className="min-h-[100px]">
      {tasks.length === 0 ? (
        <div className="p-4 text-center text-gray-500 text-sm">Drop tasks here</div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {tasks.map((task, index) => (
            <TaskItem key={index} task={task} onToggle={onToggleTask} onDelete={onDeleteTask} />
          ))}
        </ul>
      )}
    </div>
  );
};
