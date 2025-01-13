import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVertical,
  NotebookText,
  Pencil,
  PencilIcon,
  Share2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function Notebook({ notebooks }: { notebooks: Notebook[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2">
      {notebooks.map((notebook) => (
        <Card
          key={notebook.id}
          className="bg-gradient-to-tr from-[#cbc895] to-[#dedba7]"
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <NotebookText className="h-6 w-6" />

              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
                  <div className="rounded-full hover:bg-gray-100 p-2">
                    <EllipsisVertical
                      size={12}
                      className="w-6 h-6 rounded-full"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-1">
                      <Pencil />
                      修改标题
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-1">
                      <Trash2 />
                      删除
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-1">
                      <Share2 />
                      分享
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardTitle className="text-2xl">{notebook.title}</CardTitle>

            <CardDescription>{notebook.content}</CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-between">
            <p className="text-xs">{notebook.createdAt}</p>
            <p className="text-xs"> 0 个来源</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Notebook;
