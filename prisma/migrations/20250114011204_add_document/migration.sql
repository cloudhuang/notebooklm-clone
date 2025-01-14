-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "filetype" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "notebookId" TEXT NOT NULL,
    CONSTRAINT "Document_notebookId_fkey" FOREIGN KEY ("notebookId") REFERENCES "Notebook" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
