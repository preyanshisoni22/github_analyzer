/*
  Warnings:

  - You are about to drop the column `totalLanguage` on the `UserStats` table. All the data in the column will be lost.
  - Added the required column `totalLanguageUsed` to the `UserStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserStats" DROP COLUMN "totalLanguage",
ADD COLUMN     "totalLanguageUsed" INTEGER NOT NULL;
