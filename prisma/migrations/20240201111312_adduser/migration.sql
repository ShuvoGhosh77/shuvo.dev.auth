-- CreateEnum
CREATE TYPE "UserRoll" AS ENUM ('Admin');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Role" "UserRoll" NOT NULL DEFAULT 'Admin',
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_Email_key" ON "user"("Email");
