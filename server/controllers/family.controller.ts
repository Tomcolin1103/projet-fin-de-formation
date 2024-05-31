import { Request, Response } from "express";
import familyService from "../services/family.service";

const familyController = {
	createFamily: async (req: Request, res: Response) => {
		const { familyName } = req.body;

		try {
			const result = await familyService.createFamily({ familyName });
			res.send(result);
		} catch (e) {
			console.error(e);
			res.sendStatus(500);
		}
	},
	getAllFamily: async (req: Request, res: Response) => {
		try {
			const allFamily = await familyService.getAllFamily();
			res.send({ allFamily });
		} catch (e) {
			console.error(e);
			res.sendStatus(500);
		}
	},
	updateFamily: async (req: Request, res: Response) => {
		try {
			const { familyName } = req.body;
			const familyId: number = +req.params.id;
			const updateFamily = await familyService.updateFamily(familyId, {
				familyName,
			});
			res.send(updateFamily);
		} catch (e) {
			console.error(e);
			res.sendStatus(500);
		}
	},
	deleteFamily: async (req: Request, res: Response) => {
		try {
			const familyId: number = +req.params.id;
			const deletedFamily = await familyService.deleteFamily(familyId);
			res.send({ deletedFamily });
		} catch (e) {
			console.error(e);
			res.sendStatus(500);
		}
	},
};

export default familyController;
