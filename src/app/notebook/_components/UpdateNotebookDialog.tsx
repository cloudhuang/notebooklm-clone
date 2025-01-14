"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateNotebookTitle } from "@/actions/notebook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  notebookId: string;
  notebookTitle: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const UpdateNotebookDialog = ({
  notebookId,
  notebookTitle,
  isOpen,
  setOpen,
}: Props) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(notebookTitle);

  const mutation = useMutation({
    mutationFn: updateNotebookTitle,
    onSuccess: () => {
      toast.success(`修改笔记本成功`);
      queryClient.invalidateQueries({ queryKey: ["notebooks"] });
      setOpen(false);
    },
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setTitle("");
        setOpen(!isOpen);
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>修改笔记本</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              标题
            </Label>
            <Input
              id="name"
              placeholder={notebookTitle}
              value={title}
              className="col-span-3"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => mutation.mutate({ id: notebookId, title: title })}
          >
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateNotebookDialog;
