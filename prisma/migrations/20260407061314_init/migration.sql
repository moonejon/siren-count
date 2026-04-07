/*
  Warnings:

  - You are about to drop the column `cases` on the `CountEntry` table. All the data in the column will be lost.
  - You are about to drop the column `eaches` on the `CountEntry` table. All the data in the column will be lost.
  - You are about to drop the column `inners` on the `CountEntry` table. All the data in the column will be lost.
  - You are about to drop the column `eachesPerInner` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `innersPerCase` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CountEntry" DROP COLUMN "cases",
DROP COLUMN "eaches",
DROP COLUMN "inners";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "eachesPerInner",
DROP COLUMN "innersPerCase";

-- CreateTable
CREATE TABLE "ItemUnit" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "qtyPerParent" INTEGER,

    CONSTRAINT "ItemUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitCount" (
    "id" TEXT NOT NULL,
    "countEntryId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UnitCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ItemUnit_itemId_idx" ON "ItemUnit"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemUnit_itemId_level_key" ON "ItemUnit"("itemId", "level");

-- CreateIndex
CREATE UNIQUE INDEX "UnitCount_countEntryId_unitId_key" ON "UnitCount"("countEntryId", "unitId");

-- AddForeignKey
ALTER TABLE "ItemUnit" ADD CONSTRAINT "ItemUnit_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitCount" ADD CONSTRAINT "UnitCount_countEntryId_fkey" FOREIGN KEY ("countEntryId") REFERENCES "CountEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitCount" ADD CONSTRAINT "UnitCount_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "ItemUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
