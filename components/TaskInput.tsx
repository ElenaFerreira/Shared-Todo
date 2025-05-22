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
    <form onSubmit={handleSubmit} className="p-4 border-b border-gray-100">
      <div className="flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-3 border border-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-r-md transition-colors duration-200 cursor-pointer"
          disabled={!inputValue.trim()}
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};
