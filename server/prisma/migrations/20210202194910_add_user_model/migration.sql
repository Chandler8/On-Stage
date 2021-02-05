/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[email]` on the table `User`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[username]` on the table `User`. If there are existing duplicate values, the migration will fail.

*/
-- DropIndex
DROP INDEX `User.email_username_unique` ON `User`;

-- AlterTable
ALTER TABLE `User` MODIFY `email` VARCHAR(191);

-- CreateIndex
CREATE UNIQUE INDEX `User.email_unique` ON `User`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `User.username_unique` ON `User`(`username`);
