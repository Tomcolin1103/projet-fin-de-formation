import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { IUser } from "../interfaces/users.interfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const usersService = {
	createUser: async (data: {
		username: string;
		firstname: string;
		lastname: string;
		password: string;
	}) => {
		const { username, firstname, lastname, password } = data;
		try {
			const hashedPassword = bcrypt.hashSync(password, 10);
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
	login: async (username: string, password: string) => {
		try {
			const user = await prisma.users.findUnique({
				where: { username },
			});

			if (!user) {
				throw new Error("Name of user is incorrect");
			}
			const isMatch = bcrypt.compareSync(password, user.password);

			if (isMatch) {
				const token = jwt.sign(
					{ userId: user.userId.toString(), username: user.username },
					process.env.SECRET_KEY as string,
					{ expiresIn: "2 days" }
				);
				return { user, token: token };
			} else {
				throw new Error("Password or username incorrect");
			}
		} catch (e) {
			console.error(e);
			throw e;
		}
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
	getUserById: async (userId: number) => {
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
	updateUser: async (
		userId: number,
		data: {
			username?: string;
		}
	) => {
		const id: number = +userId;
		try {
			const { username } = data;
			const updateUser = await prisma.users.update({
				where: {
					userId: id,
				},
				data: {
					username: username,
				},
			});
			return updateUser;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	deleteUser: async (userId: number) => {
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
	leaveFamily: async (userId: number, familyToLeave: number) => {
		const id: number = +userId;
		const familyToLeaveId: number = +familyToLeave;
		try {
			if (id) {
				const user = await usersService.getUserById(id);
				if (user) {
					const oldFamilyList: number[] = user.familyId;
					const newFamilyList: number[] = oldFamilyList.filter(
						(familyId) => familyId !== familyToLeave
					);
					const updatedUser = await prisma.users.update({
						where: {
							userId: id,
						},
						data: {
							familyId: newFamilyList,
						},
					});

					return updatedUser;
				}
			}
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	joinFamily: async (userId: number, familyToJoin: number) => {
		const id: number = +userId;
		const familyToJoinId: number = +familyToJoin;
		try {
			if (id) {
				const user = await usersService.getUserById(id);
				if (user) {
					const oldFamilyList: number[] = user.familyId;
					oldFamilyList.push(familyToJoinId);
					const newFamilyList: number[] = oldFamilyList;
					const updatedUser = await prisma.users.update({
						where: {
							userId: id,
						},
						data: {
							familyId: newFamilyList,
						},
					});

					return updatedUser;
				}
			}
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
};

export default usersService;
