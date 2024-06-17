import { Request, Response } from "express";
// import { IUser } from "../interfaces/users.interfaces";
import bcrypt from "bcrypt";

import usersService from "../services/users.service";

const usersController = {
	createUser: async (req: Request, res: Response) => {
		const { username, firstname, lastname, password } = req.body;

		try {
			const result = await usersService.createUser({
				username,
				firstname,
				lastname,
				password,
			});
			if (result) {
				const user = await usersService.login(username, password);
				if (user) {
					console.log(user);
					res.send({ message: "Registered and logged" });
				}
			} else {
				res.send({ message: "Error" });
			}
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	login: async (req: Request, res: Response) => {
		try {
			const { username, password } = req.body;
			const user = await usersService.login(username, password);
			if (user) {
				res.setHeader("Authorization", `Bearer ${user.token}`);
				res.send({ message: "Logged", token: user.token, user: user });
			}
		} catch (e) {
			console.error(e);
			res.sendStatus(500);
		}
	},
	getAllUsers: async (req: Request, res: Response) => {
		try {
			const users = await usersService.getAllUsers();
			res.send({ users });
		} catch (error) {
			console.error(error);
			res.sendStatus(500);
		}
	},
	getUserById: async (req: Request, res: Response) => {
		try {
			const userId: number = +req.params.id;
			const user = await usersService.getUserById(userId);
			res.send({ user });
		} catch (e) {
			console.error(e);
			res.sendStatus(500);
		}
	},
	updateUser: async (req: Request, res: Response) => {
		try {
			const { username } = req.body;
			const userId: number = +req.params.id;

			const updatedUser = await usersService.updateUser(userId, {
				username,
			});
			res.send({ updatedUser });
		} catch (e) {
			console.error(e);
			res.sendStatus(500);
		}
	},
	deleteUser: async (req: Request, res: Response) => {
		try {
			const userId: number = +req.params.id;
			const deletedUser = await usersService.deleteUser(userId);
			res.send({ deletedUser });
		} catch (e) {
			console.error(e);
			res.sendStatus(500);
		}
	},
	leaveFamily: async (req: Request, res: Response) => {
		try {
			const userId: number = +req.params.id;
			const familyToLeave: number = +req.body.familyToLeave;
			const user = await usersService.leaveFamily(userId, familyToLeave);
			res.send({ user });
		} catch (e) {
			console.error(e);
			res.sendStatus(500);
		}
	},
	joinFamily: async (req: Request, res: Response) => {
		try {
			const userId: number = +req.params.id;
			const familyToJoin: number = +req.body.familyToJoin;
			const user = await usersService.joinFamily(userId, familyToJoin);
			res.send({ user });
		} catch (error) {
			console.error(error);
			res.sendStatus(500);
		}
	},
};

export default usersController;
