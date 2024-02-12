-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "tag" TEXT,
ALTER COLUMN "githubClientLink" DROP NOT NULL,
ALTER COLUMN "githubServerLink" DROP NOT NULL;
