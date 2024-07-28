type Safe<T> = { error: T };

export interface IResponse<T = any> extends Safe<IResponse> {
	data?: T | T[];
	count?: number;
	success: boolean;
	message: string;
}