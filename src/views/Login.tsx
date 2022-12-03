import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input } from "../components";
import { ErrorForm } from "@/components/ErrorForm";
import { useAuth } from "@/contexts/auth/auth";

const schema = yup.object({
	email: yup.string().required(),
	password: yup.string().required(),
});

type SchemaForm = {
	email: string;
	password: string;
};

export function Login() {
	const { login, isAuthenticated } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SchemaForm>({
		resolver: yupResolver(schema),
	});

	async function onSubmit(data: SchemaForm) {
		await login(data.email, data.password);
	}

	if (isAuthenticated) return <Navigate to="/" />;

	return (
		<div className="w-screen h-screen bg-white grid place-items-center">
			<div className="max-w-[400px] w-full rounded border border-zinc-400 px-6 py-6 shadow-sm">
				<div className="mx-auto text-center mb-6">
					<h1 className="text-3xl text-bold md:text-4xl text">Login</h1>
				</div>
				<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-2">
						<label className="flex flex-col gap-2">
							Email
							<Input placeholder="type your email" {...register("email")} />
						</label>
						{errors.email?.message && (
							<ErrorForm message={errors.email?.message} />
						)}
					</div>

					<div className="flex flex-col gap-2">
						<label className="flex flex-col gap-2">
							Password
							<Input placeholder="type your email" {...register("password")} />
						</label>
						{errors.password?.message && (
							<ErrorForm message={errors.password?.message} />
						)}
					</div>

					<div className="flex mx-auto justify-center w-1/2 mt-2">
						<Button type="submit">Login</Button>
					</div>
				</form>

				<div className="flex mt-6 text-sm">
					<p className="text-zinc-600">
						Your not have account?{" "}
						<Link
							to="/signup"
							className="underline justify-self-end text-blue-500"
						>
							SignUp
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
