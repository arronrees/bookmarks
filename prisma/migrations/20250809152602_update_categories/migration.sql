/*
  Warnings:

  - A unique constraint covering the columns `[userId,slug]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `categories_userId_slug_key` ON `categories`(`userId`, `slug`);
