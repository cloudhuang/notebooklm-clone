# Google notebooklm clone project


- Embedding
  - https://docs.together.ai/docs/embeddings-overview
- Vector Store
  - Pinecone
- RAG
  - langchain.js

```
pnpm add langchain @langchain/community @langchain/langgraph @langchain/core cheerio
pnpm add @langchain/openai 
```

### Shadow UI
```
pnpx shadcn@latest init
pnpx shadcn@latest add
```

### Prisma
```
pnpm add prisma @prisma/client
pnpx prisma init --datasource-provider sqlite
```

Generate migration script:
```
pnpx prisma migrate dev --name <NAME>
```

Generate prisma client
```
pnpx prisma generate
```

### React Query
```
pnpm add @tanstack/react-query
```