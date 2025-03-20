/*
  Warnings:

  - Changed the type of `latidute` on the `link_analytics` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `longitude` on the `link_analytics` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "link_analytics" DROP COLUMN "latidute",
ADD COLUMN     "latidute" INTEGER NOT NULL,
DROP COLUMN "longitude",
ADD COLUMN     "longitude" INTEGER NOT NULL;
