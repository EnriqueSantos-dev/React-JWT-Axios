/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { User } from "@/shared/types/User";
import { signUpService } from "@/services/sign-up.service";
import { signIn } from "@/services/sign-in.service";
import { api } from "@/lib/axios";
import { getUserInfos } from "@/services/user-info.service";
import { deleteKey, getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";

type SignUpData = {} & User;

type AuthContextData = {
	user: User | undefined;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	signUp: (data: SignUpData) => Promise<void>;
	logout: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const navigate = useNavigate();
	const [user, setUser] = React.useState<User | undefined>();
	const [token, setToken] = useState<string | undefined>(() => getLocalStorageItem("meu_app.access_token"));
	const [isAuthenticated, setIsAuthenticated] = useState(!!token);

	async function login(email: string, password: string) {
		try {
			const { access_token: accessToken, refresh_token: refreshToken } =
				await signIn({ email, password });

			setLocalStorageItem("meu_app.access_token", accessToken);
			setLocalStorageItem(
				"meu_app.refresh_token",
				JSON.stringify(refreshToken)
			);

			api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

			const user = await getUserInfos();

			setUser(user);
			setIsAuthenticated(true);
			setToken(accessToken);

			navigate("/");
		} catch (e) {
			if (e instanceof AxiosError) {
				toast.error(e?.response?.data.error);
			}
		}
	}

	async function signUp(data: SignUpData) {
		await signUpService({ ...data });
	}

	function logout() {
		setUser(undefined)
    setToken(undefined)
    setIsAuthenticated(false)
    deleteKey('meu_app.access_token')
    deleteKey('meu_app.refresh_token')

    navigate('/login')
	}

	useEffect(() => {
		(async () => {
			const token = getLocalStorageItem("meu_app.access_token");

			if (token && !user) {
				const user = await getUserInfos();

				setUser(user);
				setIsAuthenticated(true);
				navigate('/')
			}else {
				navigate('/login')
			}
		})();
	}, []);

	return (
		<AuthContext.Provider
			value={{ login, isAuthenticated, user, signUp, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
