"use server";

import { Ollama } from "@langchain/ollama";
import fs from "fs";
import pdf from "pdf-parse-debugging-disabled";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

async function parsePdf(filePath: string): Promise<string> {
  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
  } else {
    console.log("File exists!");
  }

  const pdfBuffer = fs.readFileSync(filePath);
  const pdfData = await pdf(pdfBuffer);

  return pdfData.text;
}

async function splitText(text: string): Promise<string[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200,
  });

  return await splitter.splitText(text);
}

const llm = new Ollama({
  model: process.env.NEXT_PUBLIC_LLM_MODEL,
  baseUrl: process.env.NEXT_PUBLIC_OPENAI_BASE_URL,
});

export async function generateText(text: string) {
  return llm.invoke(text);
}

async function summarizeChunks(chunks: string[]): Promise<string> {
  const summaries = [];
  for (const chunk of chunks) {
    const response = await llm.invoke(
      `Summarize the following text and return only the summary in a single paragraph. Do not include any additional text or formatting. Only return the summary.:\n\n${chunk}`,
    );

    summaries.push(response);
  }

  return summaries.join("\n\n");
}

export async function summarizePdf(filePath: string) {
  console.log("----> filePath", filePath);
  try {
    // 解析 PDF
    const text = await parsePdf(filePath);

    // 分块处理
    const chunks = await splitText(text);

    console.log("Chunks lenght:", chunks.length);

    // 总结文本
    const summary = await summarizeChunks(chunks.slice(0, 1));

    return summary;
  } catch (error) {
    console.error("Error summarizing PDF:", error);
    return "";
  }
}
