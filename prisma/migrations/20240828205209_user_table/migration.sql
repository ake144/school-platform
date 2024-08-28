/*
  Warnings:

  - You are about to drop the column `address` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `parentId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "address",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "phone",
DROP COLUMN "photo",
ADD COLUMN     "parentId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "address",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "phone",
DROP COLUMN "photo",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Student',
    "password" TEXT NOT NULL,
    "clerkUserId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_parentId_key" ON "Parent"("parentId");

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("parentId") ON DELETE RESTRICT ON UPDATE CASCADE;
