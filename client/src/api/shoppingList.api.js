import axios from "axios";

export const shoppingList = {
	createShoppingList: (name, familyId) => {
		axios
			.post(`http://localhost:3000/api/shoppingList/${familyId}`, {
				name: name,
			})
			.catch((e) => {
				console.error(e);
			});
	},
	getShoppingListByFamilyId: async (familyId) => {
		try {
			const res = await axios.get(
				`http://localhost:3000/api/shoppingList/${familyId}`
			);
			return res.data;
		} catch (e) {
			console.error(e);
		}
	},
	shoppingListDetail: async (familyId, shoppingListId) => {
		try {
			const res = await axios.get(
				`http://localhost:3000/api/shoppingList/${familyId}/${shoppingListId}`
			);
			return res.data;
		} catch (error) {
			console.error(error);
		}
	},
	deleteShoppingList: async (familyId, shoppingListId) => {
		try {
			const res = await axios.delete(
				`http://localhost:3000/api/shoppingList/${familyId}/${shoppingListId}`
			);
			return res.data;
		} catch (error) {
			console.error(error);
		}
	},
};
