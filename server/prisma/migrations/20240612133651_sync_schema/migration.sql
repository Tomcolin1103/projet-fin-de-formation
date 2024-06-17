-- CreateTable
CREATE TABLE "family" (
    "familyId" SERIAL NOT NULL,
    "familyName" VARCHAR NOT NULL,

    CONSTRAINT "family_pkey" PRIMARY KEY ("familyId")
);

-- CreateTable
CREATE TABLE "history" (
    "historyId" SERIAL NOT NULL,
    "familyId" INTEGER NOT NULL,

    CONSTRAINT "history_pkey" PRIMARY KEY ("historyId")
);

-- CreateTable
CREATE TABLE "shoppingList" (
    "shoppingListId" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "familyId" INTEGER NOT NULL,
    "name" VARCHAR NOT NULL,
    "items" INTEGER[],

    CONSTRAINT "shoppingList_pkey" PRIMARY KEY ("shoppingListId")
);

-- CreateTable
CREATE TABLE "users" (
    "userId" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "firstname" VARCHAR NOT NULL,
    "lastname" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "familyId" INTEGER[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "items" (
    "itemId" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "imageUrl" CHAR[],
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("itemId")
);

-- CreateIndex
CREATE UNIQUE INDEX "uniqueUsername" ON "users"("username");

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "familyId" FOREIGN KEY ("familyId") REFERENCES "family"("familyId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shoppingList" ADD CONSTRAINT "familyId" FOREIGN KEY ("familyId") REFERENCES "family"("familyId") ON DELETE NO ACTION ON UPDATE NO ACTION;
