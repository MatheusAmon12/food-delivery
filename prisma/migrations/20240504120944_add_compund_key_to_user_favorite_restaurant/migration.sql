/*
  Warnings:

  - The primary key for the `UserFavoriteRestaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserFavoriteRestaurant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,restaurantId]` on the table `UserFavoriteRestaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserFavoriteRestaurant" DROP CONSTRAINT "UserFavoriteRestaurant_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "UserFavoriteRestaurant_userId_restaurantId_key" ON "UserFavoriteRestaurant"("userId", "restaurantId");
