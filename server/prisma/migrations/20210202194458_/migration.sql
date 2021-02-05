-- CreateTable
CREATE TABLE `User` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191),
    `last_name` VARCHAR(191),
    `email` VARCHAR(191) NOT NULL,
    `profile_pic` VARCHAR(191),
    `username` VARCHAR(191),
    `password` VARCHAR(191),
UNIQUE INDEX `User.email_username_unique`(`email`, `username`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
