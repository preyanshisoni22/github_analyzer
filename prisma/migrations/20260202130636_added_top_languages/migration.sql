/*
  Warnings:

  - Added the required column `repoUrl` to the `Repository` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalLanguage` to the `UserStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "description" TEXT,
ADD COLUMN     "repoUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserStats" ADD COLUMN     "totalLanguage" INTEGER NOT NULL;
