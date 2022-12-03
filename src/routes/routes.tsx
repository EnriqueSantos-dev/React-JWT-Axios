import { Route, Routes } from "react-router-dom";
import { SignUp, Login, Home } from "@/views";
import { ProtectedRoute } from "./protectedRoute";

export function RoutesApp() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route
				path="/"
				index 
				element={
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}
