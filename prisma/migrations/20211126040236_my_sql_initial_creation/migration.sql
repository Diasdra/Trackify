-- CreateTable
CREATE TABLE `inventory` (
    `id` INTEGER NOT NULL,
    `product` VARCHAR(191) NOT NULL,
    `product_category` VARCHAR(191) NOT NULL,
    `qty` INTEGER NOT NULL DEFAULT 0,
    `price` DOUBLE NOT NULL,
    `vendor` VARCHAR(191),
    `location` VARCHAR(191),
UNIQUE INDEX `inventory.product_unique`(`product`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
