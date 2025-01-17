"use client";

import * as React from "react";
import { UploadIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { uploadFiles } from "@/actions/fileutils";
import { join } from "path";
import { useQueryClient } from "@tanstack/react-query";
import { indexDocument } from "@/actions/rag";

// get the upload dir path from the environment
const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

interface FileUploadProps {
  notebookId: string;
  className?: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function FileUpload({
  notebookId,
  className,
  onSuccess,
  onError,
}: FileUploadProps) {
  const queryClient = useQueryClient();

  const [isDragging, setIsDragging] = React.useState(false);
  const [uploadingFiles, setUploadingFiles] = React.useState<UploadingFile[]>(
    [],
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const uploadFile = async (file: File) => {
    const id = Math.random().toString(36).substring(7);
    const uploadingFile: UploadingFile = {
      id,
      file,
      progress: 0,
      status: "uploading",
    };

    setUploadingFiles((prev) => [...prev, uploadingFile]);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadingFiles((prev) =>
        prev.map((f) =>
          f.id === id && f.progress < 90
            ? { ...f, progress: f.progress + 10 }
            : f,
        ),
      );
    }, 200);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadFiles(notebookId, formData);

      if (result.success) {
        setUploadingFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, progress: 100, status: "completed" } : f,
          ),
        );

        onSuccess();

        const { document } = result;

        if (document) {
          await indexDocument(document.id, join(UPLOAD_DIR, document.path))

          queryClient.invalidateQueries({
            queryKey: ["documents", { notebookId }],
          });
        } else {
          const error = new Error("File path is undefined");
          onError(error.message);
        }
      } else {
        const error = new Error(result.error);
        onError(error.message);
        throw new Error(error.message);
      }
    } catch (error) {
      setUploadingFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? { ...f, status: "error", error: (error as Error).message }
            : f,
        ),
      );
    } finally {
      clearInterval(progressInterval);
    }
  };

  const handleFiles = async (files: FileList) => {
    for (const file of Array.from(files)) {
      await uploadFile(file);
    }
  };

  const handleDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files?.length) {
      handleFiles(files);
    }
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      handleFiles(files);
    }
  };

  const removeFile = (id: string) => {
    setUploadingFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "relative cursor-pointer rounded-lg border-2 border-dashed border-muted-foreground/25 p-12 text-center transition-colors hover:border-muted-foreground/50",
          isDragging && "border-muted-foreground/50 bg-muted/50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileInput}
          multiple
        />
        <div className="flex flex-col items-center gap-4">
          <UploadIcon
            className="h-12 w-12 text-muted-foreground/50"
            strokeWidth={1.5}
          />
          <div className="flex flex-col gap-1">
            <p className="text-xl font-medium">拖放文件到这里</p>
            <p className="text-sm text-muted-foreground">或点击选择文件</p>
          </div>
        </div>
      </div>

      {uploadingFiles.length > 0 && (
        <div className="rounded-lg border bg-card p-4">
          <div className="space-y-3">
            {uploadingFiles.map((file) => (
              <div key={file.id} className="flex items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {decodeURIComponent(file.file.name)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">删除文件</span>
                    </Button>
                  </div>
                  <Progress value={file.progress} className="h-1" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {file.status === "uploading" && "上传中..."}
                      {file.status === "completed" && "上传完成"}
                      {file.status === "error" && `错误: ${file.error}`}
                    </span>
                    <span>{Math.round(file.progress)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
