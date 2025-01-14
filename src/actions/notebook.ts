"use server";

import prisma from "@/lib/prisma";

export async function fetchNotebooks() {
  return prisma.notebook.findMany();
}

export async function fetchNotebookById(id: string) {
  return prisma.notebook.findUnique({
    where: {
      id,
    },
  });
}

export async function createNotebook({ title }: { title: string }) {
  return prisma.notebook.create({
    data: {
      title,
    },
  });
}

export async function updateNotebookTitle({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return prisma.notebook.update({
    where: {
      id,
    },
    data: {
      title: title || "未命名笔记本",
    },
  });
}

export async function deleteNotebook({ id }: { id: string }) {
  return prisma.notebook.delete({
    where: {
      id,
    },
  });
}

export async function updateNotebookSummary({
  id,
  summary,
}: {
  id: string;
  summary?: string | null;
}) {
  return prisma.notebook.update({
    where: {
      id,
    },
    data: {
      summary,
    },
  });
}
