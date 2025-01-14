import { fetchDocuments } from "@/actions/document";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React from "react";
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

  return (
    <div>
      {isLoading && (
        <Loader
          size={16}
          className="mt-2 flex w-full animate-spin items-center justify-center"
        />
      )}

      {
        data && (
          <div className="p-2">
            {data.map((document) => (
              <div key={document.id} className="p-2 text-sm">
                <div className="flex flex-row items-center gap-2">
                  <span>{document.filename}</span>
                  
                  
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}

export default Documents;
