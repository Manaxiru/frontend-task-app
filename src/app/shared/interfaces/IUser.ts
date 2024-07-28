export interface IUser {
	email: string;
	token: string;
	expirationTime: number;
	createdAt: string | number;
	lastLoginAt: string | number;
}
