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
