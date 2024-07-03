/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `images` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_bannerId_fkey`;

-- AlterTable
ALTER TABLE `Banner` ADD COLUMN `images` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Image`;
