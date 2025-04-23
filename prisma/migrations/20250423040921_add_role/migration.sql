/*
  Warnings:

  - Added the required column `role` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'system');

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "role" "Role" NOT NULL;
