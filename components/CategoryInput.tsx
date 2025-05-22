import React, { useState } from "react";
import { FolderPlusIcon } from "lucide-react";
interface CategoryInputProps {
  onAddCategory: (name: string) => void;
}
export const CategoryInput = ({ onAddCategory }: CategoryInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCategory(inputValue);
    setInputValue("");
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm">
      <div className="p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Create New Category</label>
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter category name..."
            className="flex-1 p-3 border border-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-r-md transition-colors duration-200 cursor-pointer"
            disabled={!inputValue.trim()}
          >
            <FolderPlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </form>
  );
};
