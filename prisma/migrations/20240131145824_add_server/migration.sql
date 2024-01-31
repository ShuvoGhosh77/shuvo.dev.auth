-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectType" TEXT NOT NULL,
    "liveProjectLink" TEXT NOT NULL,
    "projectImageUrl" TEXT NOT NULL,
    "projectDescription" TEXT NOT NULL,
    "githubClientLink" TEXT NOT NULL,
    "githubServerLink" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);
