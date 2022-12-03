import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Button, Input } from "@/components";
import { useAuth } from "@/contexts/auth/auth";
import { ErrorForm } from "@/components/ErrorForm";

const schema = yup.object({
	name: yup.string().min(6),
	birthDate: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().min(6).required(),
});

type TypeForm = {
	name: string;
	birthDate: string;
	email: string;
	password: string;
};

export function SignUp() {
	const { signUp } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TypeForm>({
		resolver: yupResolver(schema),
	});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	async function onSubmit(data: TypeForm) {
		try {
			setIsLoading(true);
			await signUp({ ...data, userName: data.name });

			navigate("/login");
		} catch (error: any) {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data.error);
			}

			toast.error(error.error);
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="w-screen h-screen bg-white grid place-items-center">
			<div className="max-w-[400px] w-full rounded border border-zinc-400 px-6 py-6 shadow-sm">
				<div className="mx-auto text-center mb-6">
					<h1 className="text-3xl text-bold md:text-4xl text">Sign Up</h1>
				</div>
				<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-2">
						<label className="flex flex-col gap-2">
							Username
							<Input placeholder="type your username" {...register("name")} />
						</label>
						{errors.name?.message && (
							<ErrorForm message={errors.name?.message} />
						)}
					</div>

					<div className="flex flex-col gap-2">
						<label className="flex flex-col gap-2">
							Birthdate
							<Input
								placeholder="YYYY-DD-MM"
								type="date"
								{...register("birthDate")}
							/>
						</label>
						{errors.birthDate?.message && (
							<ErrorForm message={errors.birthDate?.message} />
						)}
					</div>

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
						<Button type="submit" isLoading={isLoading}>
							Sign up
						</Button>
					</div>
				</form>

				<div className="flex mt-6 text-sm">
					<p className="text-zinc-600">
						You have account?{" "}
						<Link
							to="/login"
							className="underline justify-self-end text-blue-500"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
