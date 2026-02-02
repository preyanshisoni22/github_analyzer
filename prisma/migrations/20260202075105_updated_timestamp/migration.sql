/*
  Warnings:

  - You are about to drop the column `profileCreated_at` on the `GithubUser` table. All the data in the column will be lost.
  - You are about to drop the column `profileUpdated_at` on the `GithubUser` table. All the data in the column will be lost.
  - Added the required column `gitProfileCreated_at` to the `GithubUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gitProfileUpdated_at` to the `GithubUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `GithubUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GithubUser" DROP COLUMN "profileCreated_at",
DROP COLUMN "profileUpdated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gitProfileCreated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "gitProfileUpdated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
