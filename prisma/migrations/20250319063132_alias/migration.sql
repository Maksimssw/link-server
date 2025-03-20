/*
  Warnings:

  - A unique constraint covering the columns `[alias]` on the table `link` will be added. If there are existing duplicate values, this will fail.
  - Made the column `alias` on table `link` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "link" ALTER COLUMN "alias" SET NOT NULL,
ALTER COLUMN "expiresAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "link_alias_key" ON "link"("alias");
