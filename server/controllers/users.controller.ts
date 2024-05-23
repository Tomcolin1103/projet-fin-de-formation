import { Request, Response } from "express";
// import { IUser } from "../interfaces/users.interfaces";
import bcrypt from "bcrypt";

import usersService from "../services/users.service";

const usersController = {
	createUser: async (req: Request, res: Response) => {
		const { username, firstname, lastname, password } = req.body;
		const hashedPassword = bcrypt.hashSync(password, 10);

		try {
			const result = await usersService.createUser({
				username,
				firstname,
				lastname,
				hashedPassword,
			});
			if (result) {
				res.send({ result });
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
			const { username } = req.body;
			const user = await usersService.login(username);
			console.log(user);
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
			const user = await usersService.getUserById(req.params.id);
			res.send({ user });
		} catch (e) {
			console.error(e);
			res.sendStatus(500);
		}
	},
	updateUser: async (req: Request, res: Response) => {
		try {
			const { username, firstname, lastname, password, familyId } = req.body;
			const hashedPassword = bcrypt.hashSync(password, 10);

			const updatedUser = await usersService.updateUser(req.params.id, {
				username,
				firstname,
				lastname,
				hashedPassword,
				familyId,
			});
			res.send({ updatedUser });
		} catch (e) {
			console.error(e);
			res.sendStatus(500);
		}
	},
	deleteUser: async (req: Request, res: Response) => {
		try {
			const deletedUser = await usersService.deleteUser(req.params.id);
			res.send({ deletedUser });
		} catch (e) {
			console.error(e);
			res.sendStatus(500);
		}
	},
};

export default usersController;
