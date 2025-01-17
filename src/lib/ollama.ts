import { Ollama, OllamaEmbeddings } from "@langchain/ollama";
import dotenv from "dotenv";

dotenv.config();

export const llm = new Ollama({
  model: process.env.NEXT_PUBLIC_LLM_MODEL,
  baseUrl: process.env.NEXT_PUBLIC_OPENAI_BASE_URL,
});

export const embeddings = new OllamaEmbeddings({
  model: process.env.NEXT_PUBLIC_EMBEDDING_MODEL,
  baseUrl: process.env.NEXT_PUBLIC_OPENAI_BASE_URL,
});
