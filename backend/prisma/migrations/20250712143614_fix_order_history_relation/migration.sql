-- CreateTable
CREATE TABLE "OrderHistory" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "changedBy" INTEGER NOT NULL,
    "fromStatus" "OrderStatus" NOT NULL,
    "toStatus" "OrderStatus" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrderHistory_orderId_idx" ON "OrderHistory"("orderId");

-- CreateIndex
CREATE INDEX "OrderHistory_changedBy_idx" ON "OrderHistory"("changedBy");

-- AddForeignKey
ALTER TABLE "OrderHistory" ADD CONSTRAINT "OrderHistory_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderHistory" ADD CONSTRAINT "OrderHistory_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
