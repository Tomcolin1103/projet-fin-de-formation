import { Request, Response } from "express";
import itemsService from "../services/items.service";

const itemsController = {
	createItem: async (req: Request, res: Response) => {
		const { name } = req.body;
		const quantity: number = +req.body.quantity;
		const shoppingListId: number = +req.body.shoppingListId;

		try {
			const result = await itemsService.createItem(
				name,
				quantity,
				shoppingListId
			);
			res.send({ result });
		} catch (error) {
			console.error(error);
			res.sendStatus(500);
		}
	},
	getItemsByListId: async (req: Request, res: Response) => {
		const listId: number = +req.params.listId;
		try {
			const result = await itemsService.getItemBylistId(listId);
			res.send({ result });
		} catch (error) {
			console.error(error);
			res.sendStatus(500);
		}
	},
	deleteItem: async (req: Request, res: Response) => {
		const itemId: number = +req.body.itemId;
		try {
			const result = await itemsService.deleteItem(itemId);
			res.send({ result });
		} catch (error) {
			console.error(error);
			res.sendStatus(500);
		}
	},
};

export default itemsController;
