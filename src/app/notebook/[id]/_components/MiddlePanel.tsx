"use client";

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchNotebookById } from "@/actions/notebook";
import { Notebook } from "@prisma/client";
import { DocumentSource } from "@/app/notebook/_components/DocumentSource";

interface Props {
  notebookId: string;
}

function MiddlePanel({ notebookId }: Props) {
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery({
    queryKey: ["notebook", { notebookId }],
    queryFn: async () => await fetchNotebookById(notebookId),
  });

  if (isLoading) {
    return <div className="p-2">loading...</div>;
  }

  if (error) {
    toast.error("获取笔记本失败");
    return <div className="p-2 shadow-sm">error</div>;
  }

  const notebook = data as Notebook;

  return (
    <div className="p-2">
      {data && (
        <div className="flex flex-col justify-between rounded-lg border">
          <div className="flex min-h-[200px] w-full items-center justify-between p-5 text-sm">
            <div className="flex flex-col gap-3">
              <span className="text-2xl">{notebook.title}</span>
              <div>{notebook.summary || "summary"}</div>
            </div>
            <div className="relative bottom-0">
              <DocumentSource notebookId={notebook.id} />
            </div>
          </div>
          <div className="p-2">bottom panel</div>
        </div>
      )}
    </div>
  );
}

export default MiddlePanel;
