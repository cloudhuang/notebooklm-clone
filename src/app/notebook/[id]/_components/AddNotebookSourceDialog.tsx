import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "./Header";
import { UploadIcon } from "lucide-react";
import FileUpload from "@/components/file-upload";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  notebookId: string;
  notebookTitle: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const AddNotebookSourceDialog = ({
  notebookId,
  notebookTitle,
  isOpen,
  setOpen,
}: Props) => {
  const queryClient = useQueryClient();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        // TODO
        setOpen(!isOpen);
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="min-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            <Header />
          </DialogTitle>
        </DialogHeader>
        <div className="pl-2 pr-2">
          <h3 className="mb-1 text-2xl text-foreground">添加来源</h3>
          <div className="text-sm text-gray-500">
            添加来源后，NotebookLM 能够基于这些对您最重要的信息提供回答。
            （示例：营销方案、课程阅读材料、研究笔记、会议转写内容、销售文档等）
          </div>

          <div className="mt-2">
            <FileUpload
              notebookId={notebookId}
              className="mx-auto max-w-2xl"
              onSuccess={() => {
                toast.success("文件上传成功");
                queryClient.invalidateQueries({
                  queryKey: ["documents", { notebookId }],
                });
              }}
              onError={(error) => {
                toast.error("文件上传失败: " + error);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNotebookSourceDialog;
