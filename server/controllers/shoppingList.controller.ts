import { Request, Response } from "express";
import shoppingListService from "../services/shoppingList.service";

const shoppingListController = {
	createShoppingList: async (req: Request, res: Response) => {
		let { name } = req.body;
		if (!name) {
			const currentDate = new Date().toLocaleDateString();
			name = `${currentDate} Shopping list`;
		}
		const familyId: number = +req.params.id;
		try {
			const result = await shoppingListService.createShoppingList(
				name,
				familyId
			);
			res.send(result);
		} catch (error) {
			console.error(error);
			res.sendStatus(500);
		}
	},
	getShoppingListByFamilyId: async (req: Request, res: Response) => {
		const familyId: number = +req.params.id;
		try {
			const result = await shoppingListService.getShoppingListByFamilyId(
				familyId
			);
			res.send(result);
		} catch (error) {
			console.error(error);
			res.sendStatus(500);
		}
	},
	getShoppingListById: async (req: Request, res: Response) => {
		const shoppingListId: number = +req.params.listId;
		try {
			const result = await shoppingListService.getShoppingListById(
				shoppingListId
			);
			res.send(result);
		} catch (error) {
			console.error(error);
			res.sendStatus(500);
		}
	},
	deleteShoppingList: async (req: Request, res: Response) => {
		const shoppingListId: number = +req.params.listId;
		try {
			const result = await shoppingListService.deleteShoppingList(
				shoppingListId
			);
			res.send(result);
		} catch (error) {
			console.error(error);
			res.sendStatus(500);
		}
	},
};

export default shoppingListController;
