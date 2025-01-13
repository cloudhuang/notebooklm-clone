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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  EllipsisVertical,
  NotebookText,
  Pencil,
  PencilIcon,
  Share2,
  Trash2,
} from "lucide-react";
import { Notebook } from "@prisma/client";
import Moment from "react-moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotebook } from "@/actions/notebook";

function NotebookCard({ notebook }: { notebook: Notebook }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNotebook,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["notebooks"] });
    },
  });

  return (
    <div>
      <Card
        key={notebook.id}
        className="bg-gradient-to-tr from-[#f0f3d3] to-[#d1ea6e]"
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
                  <div className="flex items-center gap-1 hover:cursor-pointer">
                    <Button
                      variant="ghost"
                      className="flext justify-startw-full"
                    >
                      <Pencil />
                      修改标题
                    </Button>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuLabel>
                  <div className="flex items-center gap-1 hover:cursor-pointer">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flext justify-startw-full"
                        >
                          {" "}
                          <Trash2 />
                          删除
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>确认删除吗?</AlertDialogTitle>
                          <AlertDialogDescription>
                            你确定要删除这个笔记本吗? 这个操作无法撤销.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>取消</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              mutation.mutate({
                                id: notebook.id,
                              });
                            }}
                          >
                            确认
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>
                  <div className="flex items-center gap-1 hover:cursor-pointer">
                    <Button
                      variant="ghost"
                      className="flext justify-startw-full"
                    >
                      <Share2 />
                      分享
                    </Button>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardTitle className="text-2xl">{notebook.title}</CardTitle>
        </CardHeader>

        <CardFooter className="flex justify-between">
          <p className="text-xs">
            <Moment format="YYYY/MM/DD">{notebook.createdAt.toString()}</Moment>
          </p>
          <p className="text-xs"> 0 个来源</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default NotebookCard;
