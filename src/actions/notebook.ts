"use server";

import prisma from "@/lib/prisma";
import { deleteDocumentByNotebookId } from "./document";
import path, { join } from "path";
import fs from "fs";
const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";

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
  await deleteDocumentByNotebookId(id);

  await deleteDirectorySync(join(process.cwd(), UPLOAD_DIR, id));

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

/**
 * 同步删除目录及其内容
 * @param {string} targetPath - 要删除的目录路径。
 */
async function deleteDirectorySync(targetPath: string) {
  const resolvedPath = path.resolve(targetPath);

  try {
    if (!fs.existsSync(resolvedPath)) {
      console.log(`Path does not exist: ${resolvedPath}`);
      return;
    }

    // 使用 rmSync 递归删除目录
    fs.rmSync(resolvedPath, { recursive: true, force: true });
    console.log(`Directory deleted: ${resolvedPath}`);
  } catch (error: any) {
    console.error(`Error deleting directory: ${error.message}`);
    throw error;
  }
}
