/*
  Warnings:

  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `device` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateAtReception` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "device" TEXT NOT NULL,
ADD COLUMN     "stateAtReception" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'RECEIVED';
