import { useQuery } from "@tanstack/react-query";
import { getDocumentsCountByNotebookId } from "@/actions/notebook";

export const DocumentSource = ({ notebookId }: { notebookId: string }) => {
  const documentsCount = useQuery({
    queryKey: ["documentsCount", { notebookId }],
    queryFn: async () => await getDocumentsCountByNotebookId(notebookId),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          共 {documentsCount.data} 个来源
        </p>
      </div>
    </div>
  );
};
