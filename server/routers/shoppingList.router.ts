export const router = require("express").Router();
import shoppingListController from "../controllers/shoppingList.controller";

router
	.route("/:id")
	.post(shoppingListController.createShoppingList)
	.get(shoppingListController.getShoppingListByFamilyId);

router
	.route("/:id/:listId")
	.get(shoppingListController.getShoppingListById)
	.delete(shoppingListController.deleteShoppingList);

export default router;
