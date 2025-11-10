/*
  Warnings:

  - Added the required column `serialCode` to the `receive` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "receive_id_key";

-- AlterTable
ALTER TABLE "receive" ADD COLUMN     "serialCode" TEXT NOT NULL;
