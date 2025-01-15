"use server";

import { unlink, writeFile } from "fs/promises";
import { join } from "path";
import { createDocument } from "./document";

// get the upload dir path from the environment
const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";

export async function uploadFiles(notebookId: string, formData: FormData) {
  const file = formData.get("file") as File;
  const buffer = Buffer.from(await file.arrayBuffer());

  // Decode the file name from UTF-8
  const fileName = Buffer.from(file.name, "latin1").toString("utf8");

  // Create dist directory if it doesn't exist
  const distPath = join(process.cwd(), UPLOAD_DIR);
  try {
    await writeFile(join(distPath, fileName), buffer);

    // create document
    const document = await createDocument({
      filename: fileName,
      path: fileName,
      filetype: fileName.split(".").pop() || "",
      size: file.size,
      notebookId,
    });

    return { success: true, document: document };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteFile(fileName: string) {
  const distPath = join(process.cwd(), UPLOAD_DIR);
  try {
    await unlink(join(distPath, fileName));
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
