"use server";

import { embeddings, llm} from "@/lib/ollama";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { config, recordManager} from "@/lib/pg-vector-config";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { pull } from "langchain/hub";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { index } from "langchain/indexes";
import { Document } from "@langchain/core/documents";
import { updateDocumentSummary } from "@/actions/document";
import { getLoader } from "@/lib/loader";

export async function summarizeText(docs: Document[]) {
  const prompt = PromptTemplate.fromTemplate(
    "Summarize the following text and return only the summary in a single paragraph. Do not include any additional text or formatting. Only return the summary.: {context}",
  );

  // Instantiate
  const chain = await createStuffDocumentsChain({
    llm: llm,
    outputParser: new StringOutputParser(),
    prompt,
  });

  // Invoke
  return await chain.invoke({ context: docs});
}

export async function summarizeDocument(filePath: string) {
  const loader = await getLoader(filePath);

  const docs = await loader.load();

  // Define prompt
  const prompt = PromptTemplate.fromTemplate(
    "Summarize the following text and return only the summary in a single paragraph. Do not include any additional text or formatting. Only return the summary.: {context}",
  );

  // Instantiate
  const chain = await createStuffDocumentsChain({
    llm: llm,
    outputParser: new StringOutputParser(),
    prompt,
  });

  // Invoke
  return await chain.invoke({ context: docs.slice(0, 3) });
}

export async function generateText(text: string) {
  return llm.invoke(text);
}

export async function query(text: string) {
  const vectorStore = await PGVectorStore.initialize(embeddings, config);

  const retriever = vectorStore.asRetriever();

  const prompt = await pull<ChatPromptTemplate>("rlm/rag-prompt");

  const ragChain = await createStuffDocumentsChain({
    llm,
    prompt,
    outputParser: new StringOutputParser(),
  });

  const retrievedDocs = await retriever.invoke(text);

  return await ragChain.invoke({
    question: text,
    context: retrievedDocs,
  });
}

export async function indexDocument(id:string, filePath: string) {
  await recordManager.createSchema();

  const loader = await getLoader(filePath);

  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 200,
  });

  const splitDocs = await splitter.splitDocuments(docs);

  const summary =  await summarizeText(splitDocs.slice(0, 3))
  await updateDocumentSummary({ id: id, summary: summary });

  const vectorStore = await PGVectorStore.initialize(embeddings, config);

  // await vectorStore.addDocuments(split_text);
  console.log(
    await index({
      docsSource: splitDocs,
      recordManager,
      vectorStore,
      options: {
        cleanup: "incremental",
        sourceIdKey: "source",
      },
    }),
  );
}
