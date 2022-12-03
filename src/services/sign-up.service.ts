import { api } from "@/lib/axios";

type SignUpDate = {
	name: string;
	birthDate: string;
	email: string;
	password: string;
};

type SignUpResponse = {
	userId: string;
	name: string;
};

export async function signUpService(args: SignUpDate): Promise<SignUpResponse> {
	return api.post("/signup", { ...args });
}
