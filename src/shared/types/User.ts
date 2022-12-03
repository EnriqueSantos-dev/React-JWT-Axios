export type User = {
	name: string;
	email: string;
	password: string;
	birthDate: string;
};

export type AccessToken = {
	id: string;
	hash: string;
	userId: string;
	expiresIn: string;
};
