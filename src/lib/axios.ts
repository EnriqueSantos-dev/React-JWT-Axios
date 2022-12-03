/* eslint-disable no-underscore-dangle */
import axios from "axios";
import {
	deleteKey,
	getLocalStorageItem,
	setLocalStorageItem,
} from "@/utils/localStorage";
import { AccessToken } from "@/shared/types/User";
import {
	refreshToken,
	ResponseRefreshToken,
} from "@/services/refresh-token.service";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
	(config) => {
		const token = getLocalStorageItem("meu_app.access_token");

		if (
			token &&
			config.url !== "/login" &&
			config.url !== "/refresh-token" &&
			config.url !== "/signup"
		) {
			return {
				...config,
				headers: { ...config.headers, Authorization: `Bearer ${token}` },
			};
		}

		return config;
	},
	(e) => Promise.reject(e)
);

// with sintaxe Promise the catch
api.interceptors.response.use(
	(response) => response,
	(e) => {
		const originalRequest = e?.config;
		const status = e.response?.status;
		const oldRefreshToken = getLocalStorageItem<AccessToken>(
			"meu_app.refresh_token"
		);

		// verify if the response is a TokenExpires error
		if (status === 403 && oldRefreshToken && !originalRequest?._retry) {
			originalRequest._retry = true;

			return new Promise<ResponseRefreshToken>((resolve, reject) => {
				refreshToken(oldRefreshToken.hash)
					.then((res) => {
						const newToken = res.access_token;
						const newRefreshToken = res.refresh_token;

						setLocalStorageItem("meu_app.access_token", newToken);

						if (newRefreshToken) {
							setLocalStorageItem(
								"meu_app.refresh_token",
								JSON.stringify(newRefreshToken)
							);
						}

						originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

						return resolve(axios(originalRequest));
					})
					.catch((e) => {
						deleteKey("meu_app.access_token");
						deleteKey("meu_app.refresh_token");
						reject(e);
					});
			});
		}

		return Promise.reject(e);
	}
);

// with sintaxe async await

/* api.interceptors.response.use(
	(response) => response,
	async (e) => {
		try {
			const originalRequest = e?.config;
			const status = e.response?.status;

			// verify if the response is a TokenExpires error
			if (status === 403 && !originalRequest?._retry) {
				originalRequest._retry = true;

				const oldRefreshToken = getLocalStorageItem<AccessToken>(
					"meu_app.refresh_token"
				);

				if (oldRefreshToken) {
					// refresh token function with the old refresh token
					const newToken = await refreshToken(oldRefreshToken.hash);

					// set news token and refresh token in local storage
					setLocalStorageItem("meu_app.access_token", newToken.access_token);
					setLocalStorageItem(
						"meu_app.refresh_token",
						JSON.stringify(newToken.refresh_token) ??
							JSON.stringify(oldRefreshToken)
					);

					if (newToken) {
						// add new token in headers request
						originalRequest!.headers!.Authorization = `Bearer ${newToken.access_token}`;

						// refetch originalRequest
						return await axios(originalRequest!);
					}

					deleteKey("meu_app.access_token");
					deleteKey("meu_app.refresh_token");
					window.location.href = "/login";
				}
			}
			return await Promise.reject(e);
		} catch (err) {
			return Promise.reject(e);
		}
	}
); */
export { api };
