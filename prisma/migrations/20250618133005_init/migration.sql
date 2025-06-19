-- CreateEnum
CREATE TYPE "EnumRole" AS ENUM ('GUEST', 'ADMIN', 'MASTER');

-- CreateEnum
CREATE TYPE "EnumUserStatus" AS ENUM ('JOIN', 'WITHDRAW');

-- CreateEnum
CREATE TYPE "EnumStatus" AS ENUM ('READY', 'IN_PROGRESS', 'COMPLETED', 'CANCEL');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "nickname" TEXT,
    "role" "EnumRole" NOT NULL DEFAULT 'GUEST',
    "status" "EnumUserStatus" DEFAULT 'JOIN',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receive" (
    "id" SERIAL NOT NULL,
    "serialCode" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "phone" TEXT NOT NULL,
    "status" "EnumStatus" NOT NULL DEFAULT 'READY',
    "usersId" TEXT NOT NULL,

    CONSTRAINT "receive_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "receive_serialCode_key" ON "receive"("serialCode");

-- AddForeignKey
ALTER TABLE "receive" ADD CONSTRAINT "receive_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
