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

const llm = new Ollama({
  model: "qwen2.5:7b",
  baseUrl: "http://127.0.0.1:11434",
});

const embeddings = new OllamaEmbeddings({
  model: "mxbai-embed-large",
  baseUrl: "http://127.0.0.1:11434",
});

async function embedding() {
  const nike10kPdfPath =
    "/Users/lipinghuang/Downloads/科技助力保险行业数字化转型_基于底层技术与具体运用分析.pdf";

  const loader = new PDFLoader(nike10kPdfPath);

  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 200,
  });

  const split_text = await splitter.splitDocuments(docs);

  const vectorStore = await PGVectorStore.initialize(embeddings, config);

  await vectorStore.addDocuments(split_text);
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

query().then(() => {
  console.log("done");
});
