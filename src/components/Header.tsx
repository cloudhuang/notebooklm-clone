import { NotebookText } from "lucide-react";
import React from "react";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

function Header() {
  return (
    <div className="fixed left-0 right-0 top-0 flex h-16 items-center justify-between bg-white p-4 shadow-md dark:bg-gray-900">
      <div className="flex h-16 items-center justify-start p-2 pl-4">
        <Link href="/" className="flex flex-row items-center">
          <NotebookText />
          Opensource NotebookLM
        </Link>
      </div>
      <div className="pr-5">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Header;
