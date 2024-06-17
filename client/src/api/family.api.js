import axios from "axios";

export const family = {
	createFamily: (familyName) => {
		return axios
			.post("http://localhost:3000/api/family/newFamily", {
				familyName: familyName,
			})
			.then((res) => {
				return res.data;
			})
			.catch((e) => {
				console.error(e);
			});
	},
	getFamilyDetail: (familyId) => {
		return axios
			.get(`http://localhost:3000/api/family/${familyId}`)
			.then((res) => {
				return res.data.family;
			})
			.catch((e) => {
				console.error(e);
			});
	},
	getUserFamily: (userId) => {
		return axios
			.get(`http://localhost:3000/api/family/userFamily/${userId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((res) => {
				return res.data.userFamily;
			})
			.catch((e) => {
				console.error(e);
			});
	},
};
