import {
  DistanceStrategy,
  PGVectorStore,
} from "@langchain/community/vectorstores/pgvector";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Ollama, OllamaEmbeddings } from "@langchain/ollama";
import { pull } from "langchain/hub";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { index } from "langchain/indexes";
import { PostgresRecordManager } from "@langchain/community/indexes/postgres";

const config = {
  postgresConnectionOptions: {
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "ai4ba",
  },
  tableName: "Embedding",
  columns: {
    idColumnName: "id",
    vectorColumnName: "vector",
    contentColumnName: "content",
    metadataColumnName: "metadata",
  },
  // supported distance strategies: cosine (default), innerProduct, or euclidean
  distanceStrategy: "cosine" as DistanceStrategy,
};

// Create a new record manager
const recordManagerConfig = {
  postgresConnectionOptions: {
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "ai4ba",
  },
  tableName: "Embedding",
};
const recordManager = new PostgresRecordManager(
  "ai4ba_namespace",
  recordManagerConfig,
);

const llm = new Ollama({
  model: "qwen2.5:7b",
  baseUrl: "http://127.0.0.1:11434",
});

const embeddings = new OllamaEmbeddings({
  model: "mxbai-embed-large",
  baseUrl: "http://127.0.0.1:11434",
});

async function embedding() {
  await recordManager.createSchema();

  const pdfPath =
    "/Users/lipinghuang/Downloads/Visual Collaboration Tools for teams building software.pdf";

  const loader = new PDFLoader(pdfPath);

  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 200,
  });

  const splitDocs = await splitter.splitDocuments(docs);

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

async function summary() {
  const pdfPath =
    "/Users/lipinghuang/Downloads/科技助力保险行业数字化转型_基于底层技术与具体运用分析.pdf";

  const loader = new PDFLoader(pdfPath);

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
  const result = await chain.invoke({ context: docs });

  console.log("Summary: \n");
  console.log(result);
}

async function query() {
  const vectorStore = await PGVectorStore.initialize(embeddings, config);

  // const result = await vectorStore.similaritySearch(
  //   "科技助力保险行业数字化转型",
  //   3,
  // );

  // const retrievalQAChatPrompt = await pull("langchain-ai/retrieval-qa-chat");

  const retriever = vectorStore.asRetriever();

  const prompt = await pull<ChatPromptTemplate>("rlm/rag-prompt");

  const ragChain = await createStuffDocumentsChain({
    llm,
    prompt,
    outputParser: new StringOutputParser(),
  });

  const question = "科技助力保险行业数字化转型有哪些手段?";
  const retrievedDocs = await retriever.invoke(question);

  const answer = await ragChain.invoke({
    question: question,
    context: retrievedDocs,
  });

  console.log(answer);

  // const combineDocsChain = await createStuffDocumentsChain({
  //   llm: llm,
  //   prompt: prompt,
  // });
  // const retrievalChain = await createRetrievalChain({
  //   retriever,
  //   combineDocsChain,
  // });
  //
  // const response = await retrievalChain.invoke({
  //   input: "科技助力保险行业数字化转型有哪些手段?",
  // });
  //
  // console.log(response);
}

embedding().then(() => {
  console.log("done");
});
