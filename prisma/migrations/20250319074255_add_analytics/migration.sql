/*
  Warnings:

  - You are about to drop the column `userId` on the `link` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "link" DROP CONSTRAINT "link_userId_fkey";

-- AlterTable
ALTER TABLE "link" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "link_analytics" ADD COLUMN     "linkId" TEXT;

-- AddForeignKey
ALTER TABLE "link" ADD CONSTRAINT "link_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "link_analytics" ADD CONSTRAINT "link_analytics_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
