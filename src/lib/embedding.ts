"use server";

import { OllamaEmbeddings } from "@langchain/ollama";

export const embeddings = new OllamaEmbeddings({
  model: process.env.NEXT_PUBLIC_EMBEDDING_MODEL,
  baseUrl: process.env.NEXT_PUBLIC_OPENAI_BASE_URL,
});

export async function embedQuery(text: string) {
  return embeddings.embedQuery(text);
}
