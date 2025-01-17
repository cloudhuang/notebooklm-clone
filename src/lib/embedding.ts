"use server";

import dotenv from "dotenv";
import { embeddings } from "@/lib/ollama";

dotenv.config();

export async function embedQuery(text: string) {
  return embeddings.embedQuery(text);
}

export async function indexDocument(path: string[]) {}
