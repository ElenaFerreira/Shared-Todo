import React from "react";
import { ListTodo } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex items-center">
      <ListTodo className="h-8 w-8 text-blue-500 mr-3" />
      <h1 className="text-2xl font-bold text-gray-800">TaskFlow</h1>
    </header>
  );
};
