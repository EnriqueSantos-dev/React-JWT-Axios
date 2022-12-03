import { api } from "@/lib/axios";

export type ResponseRefreshToken = {
	access_token: string;
	refresh_token: {
		id: string;
		hash: string;
		expiresIn: string;
		userId: string;
	};
};

export async function refreshToken(
	refreshToken: string
): Promise<ResponseRefreshToken> {
	const { data } = await api.post<ResponseRefreshToken>("/refresh-token", {
		refresh_token: refreshToken,
	});

	return data;
}
