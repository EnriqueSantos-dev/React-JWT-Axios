import React from "react";

interface IProps extends React.HTMLAttributes<HTMLInputElement> {
	type?: "text" | "password" | "email" | "datetime-local" | "date";
}

export const Input = React.forwardRef<HTMLInputElement, IProps>(
	({ type = "text", ...rest }, ref) => (
		<input
			type={type}
			{...rest}
			ref={ref}
			className="h-12 px-3 border-2 border-zinc-300 text-zinc-700 rounded placeholder:text-zinc-700 placeholder:first-letter:capitalize w-full focus:border-zinc-400 outline-none transition-colors"
		/>
	)
);
