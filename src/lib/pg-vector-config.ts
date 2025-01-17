import dotenv from "dotenv";
import { DistanceStrategy } from "@langchain/community/vectorstores/pgvector";
import { PostgresRecordManager } from "@langchain/community/indexes/postgres";

dotenv.config();

export const config = {
  postgresConnectionOptions: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
  },
  tableName: process.env.DB_TABLE_NAME,
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
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
  },
  tableName: process.env.DB_TABLE_NAME,
};

export const recordManager = new PostgresRecordManager(
  process.env.NAMESPACE || "default",
  recordManagerConfig,
);
