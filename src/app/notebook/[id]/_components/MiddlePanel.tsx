"use client";

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchNotebookById } from "@/actions/notebook";
import { Notebook } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { generateText, summarizePdf } from "@/lib/model";

interface Props {
  notebookId: string;
}

function MiddlePanel({ notebookId }: Props) {
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery({
    queryKey: ["notebook", { notebookId }],
    queryFn: () => fetchNotebookById(notebookId),
  });

  if (isLoading) {
    return <div className="p-2">loading...</div>;
  }

  if (error) {
    toast.error("获取笔记本失败");
    return <div className="p-2 shadow-sm">error</div>;
  }

  async function handleClick() {
    const resp = await summarizePdf(
      "/Users/lipinghuang/Desktop/sandbox/open-notebooklm/uploads/科技助力保险行业数字化转型_基于底层技术与具体运用分析.pdf",
    );
    console.log(resp);
  }

  const notebook = data as Notebook;

  return (
    <div className="p-2">
      <div className="flex w-full items-center justify-between rounded-lg border p-2 text-sm">
        <span>{notebook.title}</span>
        <div>{notebook.summary}</div>
      </div>

      <div>
        <Button onClick={handleClick}>TEST</Button>
      </div>
    </div>
  );
}

export default MiddlePanel;
