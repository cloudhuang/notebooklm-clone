/*
  Warnings:

  - Added the required column `size` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "filetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "notebookId" TEXT NOT NULL,
    CONSTRAINT "Document_notebookId_fkey" FOREIGN KEY ("notebookId") REFERENCES "Notebook" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Document" ("createdAt", "filename", "filetype", "id", "notebookId", "path", "updatedAt") SELECT "createdAt", "filename", "filetype", "id", "notebookId", "path", "updatedAt" FROM "Document";
DROP TABLE "Document";
ALTER TABLE "new_Document" RENAME TO "Document";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
