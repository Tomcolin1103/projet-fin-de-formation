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
		return axios
			.post("http://localhost:3000/api/users/login", {
				username: username,
				password: password,
			})
			.then((res) => {
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("user", res.data.user.user.userId);
			});
	},
	updateUser: (userId, username) => {
		axios
			.put(
				`http://localhost:3000/api/users/${userId}`,
				{
					username: username,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			)
			.catch((error) => {
				console.error(error);
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
	leaveFamily: (userId, familyToLeave) => {
		return axios
			.delete(`http://localhost:3000/api/users/${userId}/leaveFamily`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				data: {
					familyToLeave: familyToLeave,
				},
			})
			.then((res) => {
				return res.data;
			})
			.catch((error) => {
				console.error(error);
				throw error;
			});
	},
	joinFamily: (userId, familyToJoin) => {
		return axios
			.post(
				`http://localhost:3000/api/users/${userId}/joinFamily`,
				{
					familyToJoin: familyToJoin,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			)
			.then((res) => {
				return res.data;
			})
			.catch((error) => {
				console.error(error);
				throw error;
			});
	},
};
