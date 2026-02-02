/*
  Warnings:

  - You are about to drop the column `created_at` on the `GithubUser` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `GithubUser` table. All the data in the column will be lost.
  - Added the required column `profileUpdated_at` to the `GithubUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GithubUser" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "profileCreated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profileUpdated_at" TIMESTAMP(3) NOT NULL;
