import axios from "axios";

export const family = {
	createFamily: (familyName) => {
		console.log(familyName);
		axios
			.post("http://localhost:3000/api/family/newFamily", {
				familyName: familyName,
			})
			.then((res) => {
				console.log(familyName);
				console.log(res);
			})
			.catch((e) => {
				console.log(familyName);
				console.error(e);
			});
	},
};
