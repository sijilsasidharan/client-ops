-- CreateEnum
CREATE TYPE "core"."ProjectStatus" AS ENUM ('ACTIVE', 'ON_HOLD', 'COMPLETED');

-- CreateTable
CREATE TABLE "core"."Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "core"."ProjectStatus" NOT NULL DEFAULT 'ACTIVE',
    "budget" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organizationId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "core"."Project" ADD CONSTRAINT "Project_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "auth"."Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "core"."Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "core"."Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
