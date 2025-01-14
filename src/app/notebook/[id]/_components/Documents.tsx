import React, { useState } from "react";
import { fetchDocuments } from "@/actions/document";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FileIcon, Loader } from "lucide-react";
import { toast } from "sonner";

function Documents({ notebookId }: { notebookId: string }) {
  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery({
    queryKey: ["documents", { notebookId }],
    queryFn: async () => await fetchDocuments(notebookId),
  });

  if (error) {
    console.log(error);
    toast.error("获取文档失败");
    return <div className="p-2 shadow-sm">error</div>;
  }

  const [selectedItems, setSelectedItems] = useState<String[]>([]);
  const allSelected = selectedItems.length === data?.length;
  const isIndeterminate = selectedItems.length > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data?.map((document) => document.id));
    }
  };

  const toggleItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4 p-4">
      <div className="flex items-center justify-between">
        <label
          htmlFor="select-all"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          选择所有来源
        </label>
        <Checkbox
          id="select-all"
          checked={allSelected}
          data-state={
            allSelected
              ? "checked"
              : isIndeterminate
                ? "indeterminate"
                : "unchecked"
          }
          onCheckedChange={toggleAll}
        />
      </div>
      {isLoading && (
        <Loader
          size={16}
          className="mt-2 flex w-full animate-spin items-center justify-center"
        />
      )}

      {data && (
        <div className="space-y-4">
          <div className="space-y-4 border-t pt-4">
            {data?.map((resource) => (
              <div
                key={resource.id}
                className="flex items-start justify-between gap-4"
              >
                <div className="flex items-center space-x-2">
                  <FileIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                  <label
                    htmlFor={resource.id}
                    className="text-sm leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {resource.filename}
                  </label>
                </div>
                <Checkbox
                  id={resource.id}
                  checked={selectedItems.includes(resource.id)}
                  onCheckedChange={() => toggleItem(resource.id)}
                  className="mt-0.5"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Documents;
