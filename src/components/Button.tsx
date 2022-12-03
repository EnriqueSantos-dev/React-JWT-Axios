import React, { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	children: React.ReactNode;
	type?: "button" | "reset" | "submit";
}

export function Button({
	isLoading = false,
	type = "button",
	children,
	...rest
}: IProps) {
	return (
		<button
			{...rest}
			type={type}
			disabled={isLoading}
			className="flex justify-center items-center bg-blue-500 rounded px-3 py-2 text-white font-semibold w-full hover:brightness-90 transition-colors disabled:opacity-7"
		>
			{isLoading ? (
				<span className="block rounded-full w-5 h-5 border-white border-r-transparent border-2 animate-spin" />
			) : (
				children
			)}
		</button>
	);
}
