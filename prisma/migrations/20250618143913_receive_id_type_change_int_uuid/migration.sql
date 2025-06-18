/*
  Warnings:

  - The primary key for the `receive` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "receive" DROP CONSTRAINT "receive_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "receive_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "receive_id_seq";
