-- CreateEnum
CREATE TYPE "EnumRole" AS ENUM ('GUEST', 'ADMIN', 'MASTER');

-- CreateEnum
CREATE TYPE "EnumUserStatus" AS ENUM ('JOIN', 'WITHDRAW');

-- CreateEnum
CREATE TYPE "EnumStatus" AS ENUM ('READY', 'COMPLETED', 'CANCEL');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "nickname" TEXT,
    "role" "EnumRole" NOT NULL DEFAULT 'GUEST',
    "status" "EnumUserStatus" NOT NULL DEFAULT 'JOIN',
    "planId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receive" (
    "id" TEXT NOT NULL,
    "serialCode" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "phone" TEXT NOT NULL,
    "status" "EnumStatus" NOT NULL DEFAULT 'READY',
    "customerId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "receive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "address_elements" JSONB NOT NULL,
    "phone" TEXT NOT NULL,
    "business_hours" JSONB NOT NULL,
    "holiday" TEXT NOT NULL,
    "homepage" TEXT NOT NULL,
    "sns" JSONB NOT NULL,
    "image" TEXT[],
    "description" TEXT NOT NULL,
    "business_number" TEXT[],
    "usersId" TEXT,

    CONSTRAINT "store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    "statsPeriod" INTEGER NOT NULL DEFAULT 3,
    "average_start" INTEGER NOT NULL,
    "average_end" INTEGER NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receiveStatusLog" (
    "id" TEXT NOT NULL,
    "receiveId" TEXT NOT NULL,
    "status" "EnumStatus" NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "receiveStatusLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "features" JSONB NOT NULL,

    CONSTRAINT "plan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "receive_serialCode_key" ON "receive"("serialCode");

-- CreateIndex
CREATE UNIQUE INDEX "receive_storeId_key" ON "receive"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "customer_phone_key" ON "customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "settings_usersId_key" ON "settings"("usersId");

-- CreateIndex
CREATE UNIQUE INDEX "plan_name_key" ON "plan"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receive" ADD CONSTRAINT "receive_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receive" ADD CONSTRAINT "receive_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receiveStatusLog" ADD CONSTRAINT "receiveStatusLog_receiveId_fkey" FOREIGN KEY ("receiveId") REFERENCES "receive"("id") ON DELETE CASCADE ON UPDATE CASCADE;
