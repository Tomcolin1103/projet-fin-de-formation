import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const shoppingListService = {
	createShoppingList: async (name: string, familyId: number) => {
		try {
			const currentDate = new Date();
			const shoppingList = await prisma.shoppingList.create({
				data: {
					name: name,
					familyId: familyId,
					date: currentDate,
					items: { create: [] },
				},
			});
			return shoppingList;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	getShoppingListByFamilyId: async (familyId: number) => {
		try {
			//Obligé d'utiliser une requete sql car le order by de prisma ne fonctionnait pas comme voulu
			const request =
				await prisma.$queryRaw`SELECT * FROM public."shoppingList" WHERE "familyId" = ${familyId} ORDER BY "shoppingListId" DESC`;
			return request;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	getShoppingListById: async (shoppingListId: number) => {
		try {
			const shoppingList = await prisma.shoppingList.findUnique({
				where: {
					shoppingListId: shoppingListId,
				},
			});
			return shoppingList;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	deleteShoppingList: async (id: number) => {
		try {
			const deleteShoppingList = await prisma.shoppingList.delete({
				where: {
					shoppingListId: id,
				},
			});
			return deleteShoppingList;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
};

export default shoppingListService;
