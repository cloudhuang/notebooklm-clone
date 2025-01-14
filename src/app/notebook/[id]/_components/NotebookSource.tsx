import React, { useState } from "react";
import { Upload } from "lucide-react";
import AddNotebookSourceDialog from "./AddNotebookSourceDialog";

interface Props {
  notebookId: string;
}

const NotebookSource = ({ notebookId }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AddNotebookSourceDialog
        notebookId={notebookId}
        notebookTitle={""}
        isOpen={open}
        setOpen={setOpen}
      />
      <div
        className="flex h-full cursor-pointer flex-row items-center justify-center gap-1 rounded-lg border border-border p-2 hover:bg-slate-300 hover:text-accent-foreground dark:border-gray-400 dark:hover:bg-gray-800"
        onClick={() => setOpen(true)}
      >
        <Upload size={16} />
        <span className="text-sm text-foreground">添加来源</span>
      </div>
    </>
  );
};

export default NotebookSource;
