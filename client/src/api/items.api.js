import axios from "axios";

const itemsApiCall = {
	getItemsByListId: async (listId) => {
		return axios
			.get(`http://localhost:3000/api/items/${listId}`)
			.then((res) => {
				return res.data.result;
			})
			.catch((error) => {
				console.error(error);
			});
	},
	createItem: async (name, quantity, listId) => {
		axios
			.post(`http://localhost:3000/api/items`, {
				name: name,
				quantity: quantity,
				shoppingListId: listId,
			})
			.catch((error) => {
				console.error(error);
			});
	},
	deleteItem: async (itemId) => {
		return axios
			.delete(`http://localhost:3000/api/items`, {
				data: {
					itemId: itemId,
				},
			})
			.catch((error) => {
				console.error(error);
			});
	},
};

export default itemsApiCall;
