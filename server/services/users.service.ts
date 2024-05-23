import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { IUser } from "../interfaces/users.interfaces";

const usersService = {
	createUser: async (data: any) => {
		const { username, firstname, lastname, hashedPassword } = data;
		try {
			const user = await prisma.users.create({
				data: {
					username: username,
					firstname: firstname,
					lastname: lastname,
					password: hashedPassword,
				},
			});
			return user;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	login: async (username: any) => {
		const user = await prisma.users.findUnique({
			where: {
				username: username,
			},
		});
		return user;
	},
	getAllUsers: async () => {
		try {
			const allUsers: IUser[] = await prisma.users.findMany();
			return allUsers;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	getUserById: async (userId: any) => {
		const id: number = +userId;
		try {
			const user = await prisma.users.findUnique({
				where: {
					userId: id,
				},
			});
			return user;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	updateUser: async (userId: any, data: any) => {
		const id: number = +userId;
		try {
			const { username, firstname, lastname, hashedPassword, familyId } = data;
			const updateUser = await prisma.users.update({
				where: {
					userId: id,
				},
				data: {
					username: username,
					firstname: firstname,
					lastname: lastname,
					password: hashedPassword,
					familyId: familyId,
				},
			});
			return updateUser;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	deleteUser: async (userId: any) => {
		const id: number = +userId;
		try {
			const deletedUser = await prisma.users.delete({
				where: {
					userId: id,
				},
			});
			return deletedUser;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
};

export default usersService;
