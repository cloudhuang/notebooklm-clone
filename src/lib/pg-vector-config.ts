import dotenv from "dotenv";
import { DistanceStrategy } from "@langchain/community/vectorstores/pgvector";
import { PostgresRecordManager } from "@langchain/community/indexes/postgres";

dotenv.config();

export const config = {
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

export const recordManagerConfig = {
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

export const recordManager = new PostgresRecordManager(
  process.env.NAMESPACE || "default",
  recordManagerConfig,
);
