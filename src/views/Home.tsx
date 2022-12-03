import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/auth/auth";
import { Button } from "@/components";

export function Home() {
	const { user , logout} = useAuth();

	return (
		<main className="h-screen">
			<header className="h-12 w-full bg-blue-700">
				<div className="max-w-[1140px] mx-auto h-full flex items-center">
					<ul className="flex gap-8 w-full justify-center">
						<NavLink
							to="/"
							className={({ isActive }) =>
								`${
									isActive && "underline"
								} text-white hover:opacity-80 transition-opacity capitalize`
							}
						>
							Home
						</NavLink>
						<NavLink
							to="/login"
							className={({ isActive }) =>
								`${
									isActive && "underline"
								} text-white hover:opacity-80 transition-opacity capitalize`
							}
						>
							login
						</NavLink>
						<NavLink
							to="/signup"
							className={({ isActive }) =>
								`${
									isActive && "underline"
								} text-white hover:opacity-80 transition-opacity capitalize`
							}
						>
							sign up
						</NavLink>
					</ul>
				</div>
			</header>

			<div className="px-6">
				<section className="max-w-[1140px] w-full mx-auto border-2 border-dashed h-fit mt-20 rounded p-6 space-y-4">
					<h1 className="text-2xl">User infos</h1>
					<pre>{JSON.stringify(user, null, 2)}</pre>

					<div className="max-w-[150px] mx-auto mt-10">
						<Button onClick={() => logout()}>Logout</Button>
					</div>
				</section>
			</div>
		</main>
	);
}
