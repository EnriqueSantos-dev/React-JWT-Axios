type Props = {
	message: string;
};

export function ErrorForm({ message }: Props) {
	return (
		<div className="text-sm text-red-500 flex gap-2 items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				enableBackground="new 0 0 32 32"
				overflow="visible"
				viewBox="0 0 32 32"
				className="inline"
			>
				<g>
					<g>
						<circle cx="16" cy="16" r="16" fill="#D72828" />
						<path fill="#E6E6E6" d="M14.5 25h3v-3h-3v3zm0-19v13h3V6h-3z" />
					</g>
				</g>
			</svg>{" "}
			<p>{message}</p>
		</div>
	);
}
