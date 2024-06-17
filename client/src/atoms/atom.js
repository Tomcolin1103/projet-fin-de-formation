import { atom } from "recoil";

const newUserState = atom({
	key: "newUserState",
	default: {
		username: "",
		firstname: "",
		lastname: "",
		password: "",
	},
});

const userState = atom({
	key: "userState",
	default: {
		userId: null,
		username: "",
		firstname: "",
		lastname: "",
		password: "",
		familyId: null,
	},
});

const isLoggedState = atom({
	key: "isLoggedState",
	default: false,
});

const familyDetailState = atom({
	key: "familyDetailState",
	default: {
		familyId: null,
		familyName: "",
	},
});

const triggerRerenderShoppingList = atom({
	key: "triggerRerenderShoppingList",
	default: 0,
});

export {
	newUserState,
	userState,
	isLoggedState,
	familyDetailState,
	triggerRerenderShoppingList,
};
