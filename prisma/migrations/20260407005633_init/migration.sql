-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isFreezer" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "eachesPerInner" INTEGER,
    "innersPerCase" INTEGER,
    "canFreeze" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemLocation" (
    "itemId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "ItemLocation_pkey" PRIMARY KEY ("itemId","locationId")
);

-- CreateTable
CREATE TABLE "CountSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CountSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountEntry" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "eaches" INTEGER NOT NULL DEFAULT 0,
    "inners" INTEGER NOT NULL DEFAULT 0,
    "cases" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CountEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- CreateIndex
CREATE INDEX "Item_categoryId_idx" ON "Item"("categoryId");

-- CreateIndex
CREATE INDEX "ItemLocation_locationId_idx" ON "ItemLocation"("locationId");

-- CreateIndex
CREATE INDEX "CountSession_userId_idx" ON "CountSession"("userId");

-- CreateIndex
CREATE INDEX "CountSession_createdAt_idx" ON "CountSession"("createdAt");

-- CreateIndex
CREATE INDEX "CountEntry_sessionId_idx" ON "CountEntry"("sessionId");

-- CreateIndex
CREATE INDEX "CountEntry_itemId_idx" ON "CountEntry"("itemId");

-- CreateIndex
CREATE INDEX "CountEntry_locationId_idx" ON "CountEntry"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "CountEntry_sessionId_itemId_locationId_key" ON "CountEntry"("sessionId", "itemId", "locationId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemLocation" ADD CONSTRAINT "ItemLocation_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemLocation" ADD CONSTRAINT "ItemLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountSession" ADD CONSTRAINT "CountSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountEntry" ADD CONSTRAINT "CountEntry_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "CountSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountEntry" ADD CONSTRAINT "CountEntry_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountEntry" ADD CONSTRAINT "CountEntry_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
