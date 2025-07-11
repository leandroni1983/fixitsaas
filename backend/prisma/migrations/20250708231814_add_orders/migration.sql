/*
  Warnings:

  - You are about to drop the column `customer` on the `Order` table. All the data in the column will be lost.
  - Added the required column `clientName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('RECEIVED', 'IN_PROCESS', 'READY', 'DELIVERED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customer",
ADD COLUMN     "clientName" TEXT NOT NULL;
