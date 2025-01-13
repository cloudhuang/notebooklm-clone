import React, { useState } from "react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  EllipsisVertical,
  NotebookText,
  Pencil,
  Share2,
  Trash2,
} from "lucide-react";
import { Notebook } from "@prisma/client";
import Moment from "react-moment";
import DeleteNotebookDialog from "./DeleteNotebookDialog";

function NotebookCard({ notebook }: { notebook: Notebook }) {
  const [deleteNotebookDialogOpen, setDeleteNotebookDialogOpen] =
    useState(false);

  return (
    <>
      <div>
        <Card
          key={notebook.id}
          className="bg-gradient-to-tr from-[#f0f3d3] to-[#d1ea6e]"
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <NotebookText className="h-6 w-6" />
              <DeleteNotebookDialog
                isOpen={deleteNotebookDialogOpen}
                setOpen={setDeleteNotebookDialogOpen}
                notebookId={notebook.id}
                notebookTitle={notebook.title}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="rounded-full hover:cursor-pointer hover:bg-gray-100 p-2">
                    <EllipsisVertical
                      size={12}
                      className="w-6 h-6 rounded-full"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <div className="flex items-center gap-1 hover:cursor-pointer">
                      <Button variant="ghost" size="sm">
                        <Pencil />
                        修改标题
                      </Button>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() =>
                      setDeleteNotebookDialogOpen((prev) => !prev)
                    }
                  >
                    <div className="flex items-center gap-1 hover:cursor-pointer">
                      <Button variant="ghost" size="sm">
                        <Trash2 />
                        删除
                      </Button>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {" "}
                    <div className="flex items-center gap-1 hover:cursor-pointer">
                      <Button variant="ghost" size="sm">
                        <Share2 />
                        分享
                      </Button>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardTitle className="text-2xl">{notebook.title}</CardTitle>
          </CardHeader>

          <CardFooter className="flex justify-between">
            <p className="text-xs">
              <Moment format="YYYY/MM/DD">
                {notebook.createdAt.toString()}
              </Moment>
            </p>
            <p className="text-xs"> 0 个来源</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default NotebookCard;