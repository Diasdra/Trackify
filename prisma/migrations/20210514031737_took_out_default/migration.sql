/*
  Warnings:

  - You are about to alter the column `price` on the `inventory` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product" TEXT NOT NULL,
    "product_category" TEXT NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "price" REAL NOT NULL,
    "vendor" TEXT,
    "location" TEXT
);
INSERT INTO "new_inventory" ("id", "product", "product_category", "qty", "price", "vendor", "location") SELECT "id", "product", "product_category", "qty", "price", "vendor", "location" FROM "inventory";
DROP TABLE "inventory";
ALTER TABLE "new_inventory" RENAME TO "inventory";
CREATE UNIQUE INDEX "inventory.product_unique" ON "inventory"("product");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
