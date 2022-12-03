import { api } from "@/lib/axios";

export type ResponseLogin = {
	access_token: string;
	refresh_token: {
		id: string;
		hash: string;
		expiresIn: string;
		userId: string;
	};
};

export type PayloadSignIn = {
	email: string;
	password: string;
};

export async function signIn({
	email,
	password,
}: PayloadSignIn): Promise<ResponseLogin> {
	const { data } = await api.post("/login", { email, password });

	return data;
}
