"use server";

import { Ollama } from "@langchain/ollama";
import exp from "constants";

const llm = new Ollama({
  model: process.env.NEXT_PUBLIC_LLM_MODEL,
  baseUrl: process.env.NEXT_PUBLIC_OPENAI_BASE_URL,
});


export async function generateText(text: string) {
  return llm.invoke(text);
}
