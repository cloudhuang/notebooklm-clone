"use server";

import prisma from "@/lib/prisma";

export async function fetchDocuments(notebookId: string) {
  return prisma.document.findMany({
    where: {
      notebookId,
    },
  });
}
export async function createDocument({
  filename,
  path,
  size,
  filetype,
  notebookId,
}: {
  filename: string;
  path: string;
  filetype: string;
  size: number;
  notebookId: string;
}) {
  return prisma.document.create({
    data: {
      filename,
      path,
      filetype,
      size,
      notebookId,
    },
  });
}

export async function updateDocumentSummary({
  id,
  summary,
}: {
  id: string;
  summary: string;
}) {
  return prisma.document.update({
    where: {
      id: id,
    },
    data: {
      summary,
    },
  });
}

export async function deleteDocumentByNotebookId(notebookId: string) {
  return prisma.document.deleteMany({
    where: {
      notebookId,
    },
  });
}