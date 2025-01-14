import { Loader, Notebook } from "lucide-react";
import React from "react";
import NotebookSource from "./NotebookSource";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDocuments } from "@/actions/document";
import { toast } from "sonner";
import Documents from "./Documents";

interface Props {
  notebookId: string;
}

function LeftPanel({ notebookId }: Props) {
  return (
    <div className="p-2">
      <NotebookSource notebookId={notebookId} />

      <Documents  notebookId={notebookId}/>
    </div>
  );
}

export default LeftPanel;
