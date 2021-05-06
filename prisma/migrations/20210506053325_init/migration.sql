-- CreateTable
CREATE TABLE "inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product" TEXT NOT NULL,
    "product_category" TEXT NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "price" REAL NOT NULL,
    "vendor" TEXT,
    "location" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "inventory.product_unique" ON "inventory"("product");
