export interface IUser {
	userId: number;
	username: string;
	firstname: string;
	lastname: string;
	password: string;
	familyId: number[] | null;
}

export interface IFamily {
	familyId: number;
	familyName: string;
}
