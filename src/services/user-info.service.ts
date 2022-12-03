import { api } from "@/lib/axios";
import { User } from "@/shared/types/User";

export type ResponseUserData = {} & User;

export async function getUserInfos(): Promise<User> {
	const { data } = await api.get("/me");
	const user: User = data;

	return user;
}
