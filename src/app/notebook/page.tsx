"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNotebook, fetchNotebooks } from "@/actions/notebook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlignJustify, Check, LayoutGrid } from "lucide-react";
import NotebookCard from "./_components/NoteBookCard";

import { Notebook } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNotebook,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notebooks"] });
      toast.success("笔记本创建成功");
      const { id } = data;

      // Navigate to the newly created notebook using next.js navigation
      router.push(`/notebook/${id}`);
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notebooks"],
    queryFn: async () => await fetchNotebooks(),
  });

  if (isLoading) return "Loading...";

  if (isError) {
    return <div>Error loading notebooks: {error?.message}</div>;
  }

  const notebooks = data as Notebook[];

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      <div className="mt-10 w-full overflow-hidden rounded-lg">
        <h1 className="inline-block bg-gradient-to-r from-indigo-500 to-pink-600 bg-clip-text text-3xl font-bold text-transparent">
          欢迎使用 NotebookLM
        </h1>
        <div className="mt-10">
          <h3 className="text-xl">我的笔记本</h3>
          <div className="mt-2 w-full border-b">{""}</div>
          <div className="flex items-center justify-between p-2">
            <Button
              size="lg"
              variant={"default"}
              className="bg-blue-700"
              onClick={() => mutation.mutate({ title: "新建笔记本" })}
            >
              <span className="dark:text-white">新建</span>
            </Button>

            <div className="flex flex-row items-center gap-4">
              <div className="flex items-center rounded-xl border">
                <div className="flex gap-1 rounded-l-xl border-r p-2 hover:cursor-pointer">
                  <Check />
                  <LayoutGrid />
                </div>
                <div className="flex gap-1 rounded-r-xl border-l bg-gray-100 p-2 hover:cursor-pointer">
                  <AlignJustify />
                </div>
              </div>
              <div className="flex items-center p-2 dark:text-white">
                <Select defaultValue="recent">
                  <SelectTrigger className="w-[100px] border-gray-400">
                    <SelectValue placeholder="最近" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">最近</SelectItem>
                    <SelectItem value="title">标题</SelectItem>
                    <SelectItem value="share">与我分享</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {notebooks.map((notebook) => (
            <NotebookCard key={notebook.id} notebook={notebook} />
          ))}
        </div>
      </div>
    </main>
  );
}
