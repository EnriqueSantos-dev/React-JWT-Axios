import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { RoutesApp } from "@/routes/routes";

export function App() {
	return (
		<>
			<RoutesApp />
			<ToastContainer />
		</>
	);
}
