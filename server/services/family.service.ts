import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { IFamily, IUser } from "../interfaces/users.interfaces";

const familyService = {
	createFamily: async (data: { familyName: string }) => {
		const { familyName } = data;
		try {
			const family = await prisma.family.create({
				data: {
					familyName: familyName,
				},
			});
			return family;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	getAllFamily: async () => {
		try {
			const allFamily: IFamily[] = await prisma.family.findMany();
			return allFamily;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	getUserFamilyByUserId: async (userId: number) => {
		const id: number = +userId;
		try {
			const user = await prisma.users.findUnique({
				where: { userId: id },
			});
			if (user) {
				const familys = await prisma.family.findMany({
					where: {
						familyId: {
							in: user.familyId,
						},
					},
				});
				return familys;
			}
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	updateFamily: async (familyId: number, data: { familyName: string }) => {
		try {
			const id: number = +familyId;
			const { familyName } = data;
			const updateFamily = await prisma.family.update({
				where: {
					familyId: id,
				},
				data: {
					familyName: familyName,
				},
			});
			return updateFamily;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	leaveFamily: async (data: {
		listFamilys: number[];
		userId: number;
		familyToLeave: number;
	}) => {
		try {
			const { listFamilys, userId, familyToLeave } = data;
			const newFamilyList = listFamilys.filter(
				(familyId: number) => familyId !== familyToLeave
			);
			const usId: number = +userId;
			const user = await prisma.users.update({
				where: {
					userId: usId,
				},
				data: {
					familyId: newFamilyList,
				},
			});
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	deleteFamily: async (familyId: number) => {
		const id: number = +familyId;
		try {
			const familyToDelete = await prisma.family.delete({
				where: {
					familyId: id,
				},
			});
			return familyToDelete;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
};

export default familyService;
