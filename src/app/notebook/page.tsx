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
import { AlignJustify, Check, LayoutGrid, Plus } from "lucide-react";
import Notebook from "./_components/notebook";

export default function Home() {
  const notebooks: Notebook[] = [
    {
      id: "1",
      title: "Notebook 1",
      content: "This is the content of Notebook 1.",
      createdAt: "2023-08-01",
      updatedAt: "2023-08-01",
    },
    {
      id: "2",
      title: "Notebook 2",
      content: "This is the content of Notebook 2.",
      createdAt: "2023-08-02",
      updatedAt: "2023-08-02",
    },
    {
      id: "3",
      title: "Notebook 3",
      content: "This is the content of Notebook 2.",
      createdAt: "2023-08-02",
      updatedAt: "2023-08-02",
    },
    {
      id: "4",
      title: "Notebook 4",
      content: "This is the content of Notebook 2.",
      createdAt: "2023-08-02",
      updatedAt: "2023-08-02",
    },
    {
      id: "5",
      title: "Notebook 5",
      content: "This is the content of Notebook 2.",
      createdAt: "2023-08-02",
      updatedAt: "2023-08-02",
    },
  ];

  return (
    <main className="flex border w-full min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full mt-10 rounded-lg overflow-hidden">
        <h1 className="bg-gradient-to-r from-indigo-500 to-pink-600 bg-clip-text text-transparent inline-block font-bold text-3xl">
          欢迎使用 NotebookLM
        </h1>
        <div className="mt-10">
          <h3 className="text-xl">我的笔记本</h3>
          <div className="w-full mt-2 border-b">{""}</div>
          <div className="flex justify-between items-center p-2">
            <Button size="lg" variant={"default"} className="bg-blue-700">
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
                  <SelectTrigger className="w-[100px]">
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

        <div>
          <Notebook notebooks={notebooks} />
        </div>
      </div>
    </main>
  );
}
