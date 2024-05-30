import axios from "axios";

export const user = {
	register: ({ username, firstname, lastname, password }) => {
		axios
			.post("http://localhost:3000/api/users/register", {
				username: username,
				firstname: firstname,
				lastname: lastname,
				password: password,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((e) => {
				console.log(e);
			});
	},
	login: (username, password) => {
		axios
			.post("http://localhost:3000/api/users/login", {
				username: username,
				password: password,
			})
			.then((res) => {
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("user", res.data.user.user.userId);
			})
			.catch((e) => {
				console.log(e);
			});
	},
	getById: (userId) => {
		return axios
			.get(`http://localhost:3000/api/users/${userId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((res) => {
				return res.data.user;
			})
			.catch((error) => {
				console.error(error);
				throw error;
			});
	},
	logout: () => {
		localStorage.clear();
	},
};
