interface Props {
	id: string;
	className?: string;
	size?: number;
}

export default function Icon({ id, className, size }: Props) {
	return (
		<svg aria-hidden="true" width={size} height={size} className={className}>
			<use href={`#${id}`} />
		</svg>
	);
}
