/*
  Warnings:

  - You are about to drop the column `phone` on the `receive` table. All the data in the column will be lost.
  - You are about to drop the column `serialCode` on the `receive` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `receive` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "receive" DROP CONSTRAINT "receive_customerId_fkey";

-- DropIndex
DROP INDEX "receive_serialCode_key";

-- DropIndex
DROP INDEX "receive_storeId_key";

-- AlterTable
ALTER TABLE "receive" DROP COLUMN "phone",
DROP COLUMN "serialCode",
ALTER COLUMN "customerId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "receive_id_key" ON "receive"("id");

-- AddForeignKey
ALTER TABLE "receive" ADD CONSTRAINT "receive_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
