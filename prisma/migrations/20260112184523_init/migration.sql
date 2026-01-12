-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "cityName" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'Turkey',
    "isVisited" BOOLEAN NOT NULL DEFAULT true,
    "visitDate" TIMESTAMP(3),
    "note" TEXT,
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);
