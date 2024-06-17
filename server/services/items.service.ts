import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const itemsService = {
	createItem: async (
		name: string,
		quantity: number,
		shoppingListId: number
	) => {
		try {
			const item = await prisma.items.create({
				data: {
					name: name,
					quantity: quantity,
					shoppingListId: shoppingListId,
				},
			});
			return item;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	getItemBylistId: async (listId: number) => {
		try {
			const items = await prisma.items.findMany({
				where: {
					shoppingListId: listId,
				},
			});
			return items;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	deleteItem: async (itemId: number) => {
		try {
			const deletedItem = await prisma.items.delete({
				where: {
					itemId: itemId,
				},
			});
			return deletedItem;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
};

export default itemsService;
