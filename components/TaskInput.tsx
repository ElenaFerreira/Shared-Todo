import React, { useState } from "react";
import { PlusIcon } from "lucide-react";

interface TaskInputProps {
  onAddTask: (text: string) => void;
}
export const TaskInput = ({ onAddTask }: TaskInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(inputValue);
    setInputValue("");
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm">
      <div className="p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Create New Task</label>
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter task description..."
            className="flex-1 p-3 text-black border border-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-r-md transition-colors duration-200 cursor-pointer"
            disabled={!inputValue.trim()}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </form>
  );
};
