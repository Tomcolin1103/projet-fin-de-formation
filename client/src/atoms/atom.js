import { atom } from "recoil";

export const newUserState = atom({
	key: "newUserState",
	default: {
		username: "",
		firstname: "",
		lastname: "",
		password: "",
	},
});

export const userState = atom({
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

export const isLoggedState = atom({
	key: "isLoggedState",
	default: true,
});
