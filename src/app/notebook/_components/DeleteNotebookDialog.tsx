import React from "react";
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
import { deleteNotebook } from "@/actions/notebook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  notebookId: string;
  notebookTitle: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const DeleteNotebookDialog = ({
  notebookId,
  notebookTitle,
  isOpen,
  setOpen,
}: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNotebook,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["notebooks"] });
    },
  });
  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogTrigger></AlertDialogTrigger>
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
                id: notebookId,
              });

              toast.success(`笔记本"${notebookTitle}"已删除`);
            }}
          >
            确认
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteNotebookDialog;
