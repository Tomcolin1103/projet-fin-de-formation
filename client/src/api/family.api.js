import axios from "axios";

export const family = {
	createFamily: (familyName) => {
		console.log(familyName);
		axios
			.post("http://localhost:3000/api/family/newFamily", {
				familyName: familyName,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((e) => {
				console.error(e);
			});
	},
	getUserFamily: (userId) => {
		return axios
			.get(`http://localhost:3000/api/family/userFamily/${userId}`)
			.then((res) => {
				return res.data.userFamily;
			})
			.catch((e) => {
				console.error(e);
			});
	},
};
