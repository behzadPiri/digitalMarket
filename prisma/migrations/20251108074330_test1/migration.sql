-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DOUBLE PRECISION DEFAULT 0.0,
    "quantity" INTEGER DEFAULT 0,
    "description" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);
