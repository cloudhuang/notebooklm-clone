import { NotebookText } from "lucide-react";
import React from "react";
import { ThemeToggle } from "./theme-toggle";

function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 flex p-4 justify-between items-center h-16 bg-white dark:bg-gray-900 shadow-md">
      <div className="flex justify-start p-2 pl-4 items-center h-16">
        <NotebookText />
        Opensource NotebookLM
      </div>
      <div className="pr-5">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Header;
