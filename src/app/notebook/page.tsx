"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNotebook, fetchNotebooks } from "@/actions/notebook";
import { useQuery } from "@tanstack/react-query";
import { AlignJustify, Check, LayoutGrid } from "lucide-react";
import NotebookCard from "./_components/NoteBookCard";

import { Notebook } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNotebook,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notebooks"] });
      toast.success("笔记本创建成功");
      const {id} = data;

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
    <main className="flex w-full min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full mt-10 rounded-lg overflow-hidden">
        <h1 className="bg-gradient-to-r from-indigo-500 to-pink-600 bg-clip-text text-transparent inline-block font-bold text-3xl">
          欢迎使用 NotebookLM
        </h1>
        <div className="mt-10">
          <h3 className="text-xl">我的笔记本</h3>
          <div className="w-full mt-2 border-b">{""}</div>
          <div className="flex justify-between items-center p-2">
            <Button size="lg" variant={"default"} className="bg-blue-700" onClick={() => mutation.mutate({title: "新建笔记本"})}>
              <span className=" dark:text-white">新建</span>
            </Button>

            <div className="flex flex-row items-center gap-4">
              <div className="flex items-center border rounded-xl">
                <div className="flex gap-1 border-r rounded-l-xl p-2 hover:cursor-pointer">
                  <Check />
                  <LayoutGrid />
                </div>
                <div className="flex gap-1 border-l rounded-r-xl p-2 hover:cursor-pointer bg-gray-100">
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2">
          {notebooks.map((notebook) => (
            <NotebookCard key={notebook.id} notebook={notebook} />
          ))}
        </div>
      </div>
    </main>
  );
}
