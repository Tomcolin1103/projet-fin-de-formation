/*
  Warnings:

  - You are about to drop the column `items` on the `shoppingList` table. All the data in the column will be lost.
  - Added the required column `shoppingListId` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" ADD COLUMN     "shoppingListId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "shoppingList" DROP COLUMN "items";

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "shoppingListId" FOREIGN KEY ("shoppingListId") REFERENCES "shoppingList"("shoppingListId") ON DELETE NO ACTION ON UPDATE NO ACTION;
