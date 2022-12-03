/* eslint-disable react/jsx-no-useless-fragment */
import { Navigate } from "react-router-dom";
import React from "react";
import { useAuth } from "@/contexts/auth/auth";

type Props = {
	children: React.ReactNode;
};

export function ProtectedRoute({ children }: Props) {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) return <>{children}</>;

	return  <Navigate to="/login" />;
}
