import itemsController from "../controllers/items.controller";

export const router = require("express").Router();

router
	.route("/")
	.post(itemsController.createItem)
	.delete(itemsController.deleteItem);
router.route("/:listId").get(itemsController.getItemsByListId);

export default router;
