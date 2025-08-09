-- DropForeignKey
ALTER TABLE `bookmark_categories` DROP FOREIGN KEY `bookmark_categories_bookmarkId_fkey`;

-- DropForeignKey
ALTER TABLE `bookmark_categories` DROP FOREIGN KEY `bookmark_categories_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `bookmarks` DROP FOREIGN KEY `bookmarks_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `categories` DROP FOREIGN KEY `categories_userId_fkey`;

-- DropIndex
DROP INDEX `bookmark_categories_categoryId_fkey` ON `bookmark_categories`;

-- DropIndex
DROP INDEX `bookmarks_user_id_fkey` ON `bookmarks`;

-- AddForeignKey
ALTER TABLE `bookmarks` ADD CONSTRAINT `bookmarks_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookmark_categories` ADD CONSTRAINT `bookmark_categories_bookmarkId_fkey` FOREIGN KEY (`bookmarkId`) REFERENCES `bookmarks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookmark_categories` ADD CONSTRAINT `bookmark_categories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
