-- DropForeignKey
ALTER TABLE "settings" DROP CONSTRAINT "settings_usersId_fkey";

-- AlterTable
ALTER TABLE "store" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "address_elements" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "business_hours" DROP NOT NULL,
ALTER COLUMN "holiday" DROP NOT NULL,
ALTER COLUMN "homepage" DROP NOT NULL,
ALTER COLUMN "sns" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
